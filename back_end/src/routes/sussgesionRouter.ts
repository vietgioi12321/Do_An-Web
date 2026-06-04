import express, { Request, Response } from 'express';
import SussgetionModel from '../models/Sussgetion'; // Trỏ đúng về file Model User đã sửa sạch lỗi ở bước trước

const router = express.Router();

// API POST: Thêm mới người dùng
router.post('/add_sussgesion', async (req: Request, res: Response) => {
  try {
    // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
    const { name, title, causeAnalysis, solutionSteps, isApplied, relatedLogId, chatBotId } = req.body;

    // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
    const newSussgetion = await SussgetionModel.create({
        name, title, causeAnalysis, solutionSteps, isApplied, relatedLogId, chatBotId
    });

    // 3. Trả về thông báo thành công cùng dữ liệu vừa tạo
    res.status(201).json({
      message: "Tạo thành công SussgetionModel!",
      data: newSussgetion
    });
  } catch (error: any) {
    // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
    res.status(500).json({ error: error.message });
  }
});

export default router;