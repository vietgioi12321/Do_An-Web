import express, { Request, Response } from 'express';
import DeviceModel from '../models/Device'; // Trỏ đúng về file Model User đã sửa sạch lỗi ở bước trước

const router = express.Router();

// API POST: Thêm mới người dùng
router.post('/add_device', async (req: Request, res: Response) => {
  try {
    // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
    const { name, osVersion, cpuCores, batteryLevel, networkSpeeds, totalApps } = req.body;

    // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
    const newDevice = await DeviceModel.create({
      name, osVersion, cpuCores, batteryLevel, networkSpeeds, totalApps
    });

    // 3. Trả về thông báo thành công cùng dữ liệu vừa tạo
    res.status(201).json({
      message: "Tạo thành công Devide!",
      data: newDevice
    });
  } catch (error: any) {
    // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
    res.status(500).json({ error: error.message });
  }
});

export default router;