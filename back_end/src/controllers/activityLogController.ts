import { Request, Response } from 'express';
import ActivityLog from '../models/ActivityLog'; // Import Model Log của bạn
import { socketService } from '../../services/socketService';

export const getActivityLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 100; 

        let queryCondition = {};
        if (userId && userId !== "1") {
            queryCondition = { userId: parseInt(userId as string) };
        }

        // Truy vấn MongoDB:
        // - find({}): Lấy toàn bộ danh sách log
        // - sort({ createdAt: -1 }): Log mới nhất đẩy lên đầu bảng
        // - limit(limit): Giới hạn số lượng bản ghi trả về để tối ưu hiệu năng
        const logs = await ActivityLog.find(queryCondition)
                                      .sort({ createdAt: -1 }) 
                                      .limit(limit);

        // Trả dữ liệu về cho Front-end React
        res.status(200).json({
            success: true,
            message: 'Tải danh sách lịch sử hoạt động thành công!',
            count: logs.length,
            data: logs
        });

    } catch (error: any) {
        console.error('Lỗi khi lấy dữ liệu Activity Log:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra ở hệ thống phía máy chủ không thể lấy được log!'
        });
    }
};


// API POST: Thêm mới người dùng
export const addActivitylog = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
      const { actionName, details, userId, timestamp } = req.body;
  
      // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
      const newActivityLog = await ActivityLog.create({
          actionName, details, userId, timestamp
      });
  
      // 🔥 PHÁT TÍN HIỆU REAL-TIME CHO FRONT-END
      socketService.emitToAll('ACTIVITYLOG_CHANGED', {
          data: newActivityLog
      });

      // 3. Trả về thông báo thành công cùng dữ liệu vừa tạo
      res.status(201).json({
        message: "Tạo thành công ActivityLog!",
        data: newActivityLog
      });
    } catch (error: any) {
      // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
      res.status(500).json({ error: error.message });
    }
  };