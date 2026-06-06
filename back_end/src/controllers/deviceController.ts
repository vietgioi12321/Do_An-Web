import { Request, Response } from 'express';
import Device from '../models/Device'; // Import Model Log của bạn

export const getDevices = async (req: Request, res: Response): Promise<void> => {
    try {
        // Lấy các tham số phân trang từ Query String (nếu Front-end có truyền lên)
        // Ví dụ: /api/logs?limit=50
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 100; 

        // Truy vấn MongoDB:
        // - find({}): Lấy toàn bộ danh sách log
        // - sort({ createdAt: -1 }): Log mới nhất đẩy lên đầu bảng
        // - limit(limit): Giới hạn số lượng bản ghi trả về để tối ưu hiệu năng
        const logs = await Device.find({})
                                      .sort({ createdAt: -1 }) 
                                      .limit(limit);

        // Trả dữ liệu về cho Front-end React
        res.status(200).json({
            success: true,
            message: 'Tải danh sách thiết bị điền thoại thành công!',
            count: logs.length,
            data: logs
        });

    } catch (error: any) {
        console.error('Lỗi khi lấy dữ liệu Device:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra ở hệ thống phía máy chủ không thể lấy được log!'
        });
    }
};


// API POST: Thêm mới người dùng
export const addDevice = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
      const { name, osVersion, cpuCores, batteryLevel, networkSpeeds, totalApps } = req.body;
  
      // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
      const newDevice = await Device.create({
            name, osVersion, cpuCores, batteryLevel, networkSpeeds, totalApps
      });
  
      // 3. Trả về thông báo thành công cùng dữ liệu vừa tạo
      res.status(201).json({
        message: "Tạo thành công Device!",
        data: newDevice
      });
    } catch (error: any) {
      // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
      res.status(500).json({ error: error.message });
    }
  };