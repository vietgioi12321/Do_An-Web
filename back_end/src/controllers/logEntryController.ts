import { Request, Response } from 'express';
import LogEntry from '../models/LogEntry';
import Device from '../models/Device'; // Import model Device của bạn để đối chiếu dữ liệu

// 🛠️ API 1: Lấy danh sách lỗi (Có ánh xạ Tên thiết bị và Trạng thái gán)
export const getLogEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Lấy toàn bộ danh sách BugLog từ cơ sở dữ liệu
    const logEntry = await LogEntry.find().sort({ createdAt: -1 });

    // 2. Lấy toàn bộ danh sách thiết bị để map thủ công (Tối ưu cho mảng nhỏ)
    const devices = await Device.find({});

    // 3. Tiến hành ánh xạ (Map) dữ liệu theo logic của bạn
    const formattedLogs = logEntry.map(log => {
      // Tìm tên thiết bị dựa trên deviceId
      const targetDevice = devices.find(d => d.deviceId === log.deviceId);
      const deviceName = targetDevice ? targetDevice.name : `Thiết bị không xác định (${log.deviceId})`;

      // Xét điều kiện trường userId
      const assignStatus = log.userId === 1 ? "Chưa gán cho Developer" : "Đã gán";

      return {
        logEntryId: log.logEntryId,
        name: log.name,
        logLevel: log.logLevel,
        errorMessage: log.errorMessage,
        stackTrace: log.stackTrace,
        deviceId: log.deviceId,
        deviceName: deviceName, // Trả thêm Tên thiết bị về cho Front-end
        userId: log.userId,
        assignStatus: assignStatus, // Trả thêm trạng thái chữ về cho Front-end
        createdAt: log.timestamp
      };
    });

    res.status(200).json({
      success: true,
      message: "Tải danh sách log lỗi hệ thống thành công!",
      count: formattedLogs.length,
      data: formattedLogs
    });

  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách BugLog:", error);
    res.status(500).json({ success: false, message: error.message || "Lỗi máy chủ!" });
  }
};

// 🛠️ API 2: Đẩy một log lỗi mới lên hệ thống (Từ app Mobile hoặc Extension)
export const addLogEntry = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
      const {name, logLevel, errorMessage, stackTrace, deviceId, userId, hardwareInfo, timestamp } = req.body;
  
      // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
      const newLogEntryModel = await LogEntry.create({
          name, logLevel, errorMessage, stackTrace, deviceId, userId, hardwareInfo, timestamp
      });
  
      // 3. Trả về thông báo thành công cùng dữ liệu vừa tạo
      res.status(201).json({
        message: "Tạo thành công LogEntryModel!",
        data: newLogEntryModel
      });
    } catch (error: any) {
      // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
      res.status(500).json({ error: error.message });
    }
  };