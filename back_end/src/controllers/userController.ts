import { Request, Response } from 'express';
import UserModel from '../models/User'; // Import Model User của bạn

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // 1. Kiểm tra xem người dùng có nhập đủ tài khoản / mật khẩu không
    if (!username || !password) {
       res.status(400).json({ error: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!' });
       return;
    }

    // 2. Tìm người dùng trong Database bằng username
    const user = await UserModel.findOne({nameAccount : username });

    if (!user) {
       res.status(401).json({ error: 'Tài khoản không chính xác!' });
       return;
    }

    // 3. Kiểm tra mật khẩu (So sánh trực tiếp hoặc qua bcrypt)
    if (user.password !== password) {
       res.status(401).json({ error: 'Mật khẩu không chính xác!' });
       return;
    }

    // 4. Đăng nhập thành công -> Trả về thông tin cần thiết (Không trả về mật khẩu)
    res.status(200).json({
      message: 'Đăng nhập hệ thống thành công!',
      user: {
        userId: user.userId,
        userName: user.nameUser,
        userEmail: user.email,
        role: user.rules || "User"
      }
    });

  } catch (error: any) {
    console.error('Lỗi controller login:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra ở hệ thống phía máy chủ!' });
  }
};