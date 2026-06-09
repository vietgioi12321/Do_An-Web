import { Request, Response } from 'express';
import UserModel from '../models/User'; // Import Model User của bạn
import ActivityLog from '../models/ActivityLog';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const recoverPasswordController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email } = req.body;
  
      // 1. Kiểm tra xem người dùng có nhập đủ tài khoản / mật khẩu không
      if (!username || !email) {
         res.status(400).json({ error: 'Vui lòng nhập đầy đủ tài khoản và email!' });
         return;
      }
  
      // 2. Tìm người dùng trong Database bằng username
      const user = await UserModel.findOne({nameAccount : username});
  
      if (!user) {
         res.status(401).json({ error: 'Tài khoản không chính xác!' });
         return;
      }
  
      // 3. Kiểm tra mật khẩu (So sánh trực tiếp hoặc qua bcrypt)
      if (user.email !== email) {
         res.status(401).json({ error: 'Email không chính xác!' });
         return;
      }
  
      const token = jwt.sign(
        { userId: user.userId, role: user.rules }, 
        process.env.JWT_SECRET || 'MOCK_SECRET_KEY'
      );

      await ActivityLog.create({
        userId: user.userId,
        actionName: 'RECOVER PASSWORD',
        details: `Người dùng ${user.nameUser} đã lấy lại mật khẩu thành công.`,
        timestamp: new Date()
      });
  
      // 4. Đăng nhập thành công -> Trả về thông tin cần thiết (Không trả về mật khẩu)
      res.status(200).json({
        message: 'Hoàn tất việc lấy lại mật khẩu!',
        success: true,
        token: token,
        user: {
          userId: user.userId,
          userAccount: user.nameAccount,
          userEmail: user.email,
          role: user.rules || "User"
        }
      });
  
    } catch (error: any) {
      console.error('Lỗi controller login:', error);
      res.status(500).json({ error: 'Có lỗi xảy ra ở hệ thống phía máy chủ!' });
    }
  };