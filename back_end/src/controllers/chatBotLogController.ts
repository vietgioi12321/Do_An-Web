import { Request, Response } from 'express';
import ChatBotLog from '../models/ChatBotLog'; 

export const getChatBotLog = async (req: Request, res: Response): Promise<void> => {
    try {
        // Lấy userId từ URL params động đã cấu hình ở Router
        const userId = parseInt(req.params.userId as string);
        
        if (isNaN(userId)) {
            res.status(400).json({ success: false, message: 'userId truyền lên phải là một số!' });
            return;
        }

        const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

        // 🌟 SỬA: Truyền userId vào bộ lọc find() để chỉ lấy đúng tin nhắn của user đó
        // 🌟 SỬA: Thay 'createdAt' bằng 'timestamp' (hoặc sắp xếp tăng dần 1 để tin nhắn cũ xếp trước, mới xếp sau)
        const logs = await ChatBotLog.find({ userId: userId })
                                      .sort({ timestamp: 1 }) 
                                      .limit(limit);

        res.status(200).json({
            success: true,
            message: 'Tải đoạn chat thành công!',
            count: logs.length,
            data: logs
        });

    } catch (error: any) {
        console.error('Lỗi khi lấy dữ liệu ChatBot:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra ở hệ thống phía máy chủ không thể lấy được log!'
        });
    }
};

// API POST giữ nguyên logic truyền từ body lên của bạn, rất ổn!
export const add_ChatBotLog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatBotName, version, userId, messageUser, messageChat, timestamp } = req.body;
  
      const newadd_ChatBotLog = await ChatBotLog.create({
          chatBotName, version, userId, messageUser, messageChat, timestamp
      });
  
      res.status(201).json({
        message: "Tạo thành công ChatBotLog!",
        data: newadd_ChatBotLog
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};