import { Request, Response } from "express";
import ChatBotLog from "../models/ChatBotLog";
import LogEntry from "../models/LogEntry";
import Device from "../models/Device";
import Sussgesion from "../models/Sussgetion";

import { generateAIResponse } from "../../services/geminiService";

export const postChatBotLog = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, logEntryId, prompt, botType  } = req.body;

        // 1. Kiểm tra dữ liệu đầu vào cơ bản
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nội dung câu hỏi (prompt) không được để trống!"
            });
        }

        // 2. RAG - Context Injection: Quét prompt để lấy ID và truy vấn DB
        let systemContext = "";
        
        const regex = /(?:id|log|thiết bị|lỗi)[\s:=]*([a-zA-Z0-9_-]+)/gi;
        let match;
        let logRecord = null;
        let deviceRecord = null;
        let sussgesionRecord = null;

        while ((match = regex.exec(prompt)) !== null) {
            const extractedId = match[1];
            const isNumericId = !isNaN(Number(extractedId));

            // Tìm log theo logEntryId (nếu ID là số) 
            if (isNumericId && !logRecord) {
                logRecord = await LogEntry.findOne({ logEntryId: Number(extractedId) }).sort({ timestamp: -1 }).lean();
            }
            
            // Nếu không thấy theo logEntryId thì thử tìm theo deviceUniqueId (chữ/số)
            if (!logRecord) {
                logRecord = await LogEntry.findOne({ deviceUniqueId: extractedId }).sort({ timestamp: -1 }).lean();
            }

            // MỞ RỘNG: Nếu user nhập ID của Thiết bị (vd: ID: 108), ta tìm Device -> từ đó lấy LogEntry mới nhất của Device đó
            if (!logRecord && isNumericId) {
                const tempDevice = await Device.findOne({ deviceId: Number(extractedId) }).lean();
                if (tempDevice) {
                    logRecord = await LogEntry.findOne({ deviceUniqueId: tempDevice.deviceUniqueId }).sort({ timestamp: -1 }).lean();
                }
            }

            if (logRecord) break; // Nếu đã tìm thấy bối cảnh lỗi thì dừng việc quét ID khác
        }

        // Nếu tìm thấy Log, tìm tiếp Device và Sussgesion liên quan
        if (logRecord) {
            deviceRecord = await Device.findOne({ deviceUniqueId: logRecord.deviceUniqueId }).lean();
            sussgesionRecord = await Sussgesion.findOne({ relatedLogId: logRecord.logEntryId }).lean();
                
                systemContext += "[THÔNG TIN TỰ ĐỘNG TRÍCH XUẤT TỪ CƠ SỞ DỮ LIỆU]\n";
                systemContext += `- Mã Lỗi (Log ID): ${logRecord.logEntryId}\n`;
                systemContext += `- Mức độ: ${logRecord.logLevel}\n`;
                systemContext += `- Tên lỗi: ${logRecord.name}\n`;
                systemContext += `- Chi tiết lỗi: ${logRecord.errorMessage}\n`;
                systemContext += `- Stack Trace: ${logRecord.stackTrace}\n`;
                
                if (deviceRecord) {
                    systemContext += `- Thông tin thiết bị gặp lỗi: ${deviceRecord.device?.brand} ${deviceRecord.device?.model} (HĐH: ${deviceRecord.device?.OsVersion})\n`;
                }
                
                if (sussgesionRecord) {
                    systemContext += `- Gợi ý giải quyết trước đây (Sussgesion): ${sussgesionRecord.solutionSteps}\n`;
                    systemContext += `- Phân tích nguyên nhân cũ: ${sussgesionRecord.causeAnalysis}\n`;
                }
                
                systemContext += "\n[YÊU CẦU DÀNH CHO AI]: Dựa vào những thông tin hệ thống cung cấp ở trên, hãy phân tích để trả lời câu hỏi của người dùng và định dạng câu trả lời theo cấu trúc trực quan gồm Tiêu đề, Nguyên nhân, và Các bước xử lý (dùng các icon 📌, 🔍, 🛠️).\n";
        }

        // 3. Gọi sang Gemini Service để lấy câu trả lời từ AI (Truyền thêm bối cảnh systemContext)
        const aiResult = await generateAIResponse(prompt, botType || "flash", systemContext);

        // 4. Khởi tạo đối tượng ChatBotLog để lưu lịch sử
        const newChatLog = new ChatBotLog({
            userId: userId || null,
            logEntryId: logEntryId || null,
            messageUser: prompt,
            messageChat: aiResult.responseText,
            timestamp: new Date(), 
            version: aiResult.version,
            chatBotName: aiResult.botName
        });

        const savedLog = await newChatLog.save();

        // 5. Trả kết quả thành công về cho phía Client (Mobile App / Web)
        return res.status(200).json({
            success: true,
            message: "Xử lý prompt và lưu lịch sử thành công.",
            data: savedLog // Trả về nguyên object vừa lưu để client dễ render
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