import { Request, Response } from 'express';
import UserModel from '../models/User'; // Import Model User của bạn
import ActivityLog from '../models/ActivityLog';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

dotenv.config();

export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, newPassword, newPassword2 } = req.body;
  
      // 1. Kiểm tra xem người dùng có nhập đủ tài khoản / mật khẩu không
      if (!username || !newPassword || !newPassword2) {
         res.status(400).json({ error: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu mới và nhập lại mật khẩu!' });
         return;
      }

      // 2. Kiểm tra mật khẩu mới và mật khẩu nhập lại có khớp nhau không
      if (newPassword !== newPassword2) {
        res.status(400).json({ 
          success: false, 
          error: 'Mật khẩu nhập lại không trùng khớp!' 
        });
        return;
     }
  
      // 3. Tìm người dùng trong Database bằng username
      const user = await UserModel.findOne({nameAccount : username});
  
      if (!user) {
         res.status(401).json({ error: 'Tài khoản không chính xác!' });
         return;
      }

      //4. TIẾN HÀNH ĐỔI MẬT KHẨU
      user.password = md5(newPassword);
      await user.save();
  
      const token = jwt.sign(
        { userId: user.userId, role: user.rules }, 
        process.env.JWT_SECRET || 'MOCK_SECRET_KEY'
      );

      await ActivityLog.create({
        userId: user.userId,
        actionName: 'CHANGE PASSWORD',
        details: `Người dùng ${user.nameUser} đã đổi mật khẩu thành công.`,
        timestamp: new Date()
      });
  
      // 4. Đăng nhập thành công -> Trả về thông tin cần thiết (Không trả về mật khẩu)
      res.status(200).json({
        message: 'Hoàn tất việc đổi mật khẩu!',
        success: true,
        token: token,
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