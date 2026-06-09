import { Request, Response } from "express";
import ChatBotLog from "../models/ChatBotLog";

import { generateAIResponse } from "../../services/geminiService";

export const postChatBotLog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId,logEntryId,prompt  } = req.body;

        // 1. Kiểm tra dữ liệu đầu vào cơ bản
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nội dung câu hỏi (prompt) không được để trống!"
            });
        }

        // 2. Gọi sang Gemini Service để lấy câu trả lời từ AI
        const aiResponseText = await generateAIResponse(prompt);

        // 3. Khởi tạo đối tượng từ đúng Model đã import (ChatBotLog)
        const newChatLog = new ChatBotLog({
            userId: userId || null,
            logEntryId: logEntryId || null,
            messageUser: prompt,
            messageChat: aiResponseText,

            timestamp: new Date(), 
            version: "gemini-2.5-flash",
            chatBotName: "Gemini Assistant"
        });

        const savedLog = await newChatLog.save();

        // 4. Trả kết quả thành công về cho phía Client (Mobile App / Web)
        return res.status(200).json({
            success: true,
            message: "Xử lý prompt và lưu lịch sử thành công.",
            data: {
                id: savedLog._id,
                prompt: savedLog.messageUser,
                response: savedLog.messageChat,
                createdAt: (savedLog as any).createdAt // Ép kiểu 'any' để tránh lỗi nếu Schema chưa định nghĩa rõ timestamps
            }
        });

    } catch (error: any) {
        console.error("❌ Lỗi tại Chatbot API Route:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi hệ thống khi xử lý chatbot.",
            error: error.message
        });
    }
};