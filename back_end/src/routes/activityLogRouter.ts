import express, { Request, Response } from 'express';
import ActivityLogModel from '../models/ActivityLog'; // Trỏ đúng về file Model User đã sửa sạch lỗi ở bước trước

const router = express.Router();

// API POST: Thêm mới người dùng
router.post('/add_activitylog', async (req: Request, res: Response) => {
  try {
    // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
    const { actionName, details, userId, timestamp } = req.body;

    // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
    const newActivityLog = await ActivityLogModel.create({
        actionName, details, userId, timestamp
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
});

export default router;