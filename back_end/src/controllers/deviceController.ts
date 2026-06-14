import { Request, Response } from 'express';
import { socketService } from '../../services/socketService';
import Device from '../models/Device'; // Import Model Log của bạn
import LogEntry from '../models/LogEntry';
import ActivityLog from '../models/ActivityLog';


export const getDevices = async (req: Request, res: Response): Promise<void> => {
  try {
      const { userID } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100; 

      let queryCondition = {}; 

      // Nếu userID khác "1" (Tài khoản User thường, cần lọc thiết bị)
      if (userID && userID !== "1") {
          
          // Lấy danh sách log thô từ MongoDB về dựa trên userId
          const userLogs = await LogEntry.find({ userId: parseInt(userID as string) }).lean();
          
          // Khởi tạo 2 mảng riêng biệt để phân loại dữ liệu tránh lỗi ép kiểu của Mongoose
          const numericDeviceIds: number[] = [];
          const stringDeviceUniqueIds: string[] = [];

          userLogs.forEach((log: any) => {
              // Nhóm 1: Kiểm tra deviceId (Dữ liệu cũ - kiểu số như 102, 109)
              if (log.deviceId && !isNaN(Number(log.deviceId))) {
                  numericDeviceIds.push(Number(log.deviceId));
              }
              
              // Nhóm 2: Kiểm tra deviceUniqueId (Dữ liệu mới - chuỗi Hex như "a177232eb6eba2ee")
              if (log.deviceUniqueId) {
                  stringDeviceUniqueIds.push(String(log.deviceUniqueId));
              }
          });

          // Loại bỏ các phần tử bị trùng lặp trong mảng bằng Set
          const cleanDeviceIds = [...new Set(numericDeviceIds)];
          const cleanDeviceUniqueIds = [...new Set(stringDeviceUniqueIds)];

          console.log("================ DEBUG DỮ LIỆU PHÂN LOẠI KHỚP SCHEMA ================");
          console.log("-> Tổng số log của User tìm thấy:", userLogs.length);
          console.log("-> Các ID dạng Số (deviceId) tìm được:", cleanDeviceIds);
          console.log("-> Các ID dạng Chuỗi (deviceUniqueId) tìm được:", cleanDeviceUniqueIds);
          console.log("=====================================================================");

          // Xây dựng điều kiện truy vấn $or an toàn
          const orConditions: any[] = [];

          // Nếu có ID chuỗi, chỉ quét trên cột deviceUniqueId (Kiểu String trong bảng Device)
          if (cleanDeviceUniqueIds.length > 0) {
              orConditions.push({ deviceUniqueId: { $in: cleanDeviceUniqueIds } });
          }

          // Nếu có ID số, chỉ quét trên cột deviceId (Kiểu Number trong bảng Device)
          if (cleanDeviceIds.length > 0) {
              orConditions.push({ deviceId: { $in: cleanDeviceIds } });
          }

          // Phân định kết quả nạp vào queryCondition
          if (orConditions.length > 0) {
              queryCondition = { $or: orConditions };
          } else {
              // Nếu user chưa từng phát sinh lỗi nào trên bất kỳ thiết bị nào -> Ép kết quả về mảng rỗng []
              queryCondition = { deviceId: -1 }; 
          }
      }

      // Thực hiện truy vấn vào database bảng Device
      const devices = await Device.find(queryCondition)
                                  .sort({ updatedAt: -1 }) // Ưu tiên những máy vừa cập nhật lên đầu bảng
                                  .limit(limit);

      // Trả dữ liệu sạch về cho Front-end React
      res.status(200).json({
          success: true,
          message: userID === "1" 
              ? 'Tải toàn bộ danh sách thiết bị thành công (Admin)!' 
              : 'Tải danh sách thiết bị dựa theo lịch sử lỗi của User thành công!',
          count: devices.length,
          data: devices
      });

  } catch (error: any) {
      console.error('Lỗi khi lấy dữ liệu Device:', error);
      res.status(500).json({
          success: false,
          message: 'Có lỗi xảy ra ở hệ thống phía máy chủ không thể lấy được thiết bị!'
      });
  }
};


// API POST: Thêm mới người dùng
export const addDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
      const { deviceUniqueId, device, cpu, gpu, network, memory, timestamp } = req.body;

      // Kiểm tra xem phía App có gửi ID định danh duy nhất lên không
      if (!deviceUniqueId) {
        res.status(400).json({ error: "Thiếu deviceUniqueId để định danh thiết bị!" });
        return;
      }
      

      let dbDevice = await Device.findOne({ deviceUniqueId: deviceUniqueId });
      let isNewDevice = false;
  
      if (dbDevice) {
        dbDevice.device = device;
        dbDevice.cpu = cpu;
        dbDevice.gpu = gpu;
        dbDevice.network = network;
        dbDevice.memory = memory;
        dbDevice.timestamp = new Date();
      } else {
        isNewDevice = true;
        dbDevice = new Device({
            deviceUniqueId,
            device,
            cpu,
            gpu,
            network,
            memory,
            timestamp: new Date()
        });
      }

    const savedDevice = await dbDevice.save();

    // 🔥 BẮN TÍN HIỆU REAL-TIME SIÊU GỌN CHỈ VỚI 1 DÒNG LỆNH:
    socketService.emitToAll('DEVICE_CHANGED', {
      action: isNewDevice ? 'CREATE' : 'UPDATE',
      deviceUniqueId: deviceUniqueId,
      data: savedDevice
    });

    // 🌟 KHỞI TẠO VÀ LƯU ACTIVITY LOG VÀO DATABASE
    await ActivityLog.create({
      userId: 1, // Mặc định là Admin (hoặc lấy từ req.body/token nếu có)
      actionName: isNewDevice ? 'ADD_DEVICE' : 'UPDATE_DEVICE',
      details: isNewDevice 
        ? `Đã thêm mới thiết bị ${device.brand} ${device.model} (${deviceUniqueId}) vào hệ thống.`
        : `Đã cập nhật cấu hình cho thiết bị ${device.brand} ${device.model} (${deviceUniqueId}).`,
      timestamp: new Date()
    });

    res.status(200).json({
      message: isNewDevice ? "Thêm mới thiết bị thành công!" : "Cập nhật cấu hình thiết bị thành công!",
      data: savedDevice
    });
    } catch (error: any) {
      // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
      res.status(500).json({ 
        success: false, 
        error: error.message 
    });
    }
  };