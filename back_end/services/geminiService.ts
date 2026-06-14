import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

// Định nghĩa mảng 3 API Keys cho từng Bot (Để chống bị limit/chặn)
const BOT_CONFIGS = {
    "flash": {
        modelName: "gemini-2.5-flash", // Mô hình tốc độ cao
        displayName: "AI Bug Assistant (Flash)",
        keys: [
            process.env.GEMINI_FLASH_KEY_1 || process.env.GEMINI_API_KEY_MAIN || "",
            process.env.GEMINI_FLASH_KEY_2 || process.env.GEMINI_API_KEY_BACKUP_1 || "",
            process.env.GEMINI_FLASH_KEY_3 || process.env.GEMINI_API_KEY_BACKUP_1 || "",
        ].filter(Boolean)
    },
    "pro": {
        modelName: "gemini-1.5-pro", // Mô hình suy luận sâu
        displayName: "AI Bug Assistant (Pro)",
        keys: [
            process.env.GEMINI_PRO_KEY_1 || process.env.GEMINI_API_KEY_MAIN || "",
            process.env.GEMINI_PRO_KEY_2 || process.env.GEMINI_API_KEY_BACKUP_1 || "",
            process.env.GEMINI_PRO_KEY_3 || ""
        ].filter(Boolean)
    },
    "flash-8b": {
        modelName: "gemini-1.5-flash-8b", // Mô hình tối ưu chi phí
        displayName: "AI Bug Assistant (Flash-8B)",
        keys: [
            process.env.GEMINI_FLASH8B_KEY_1 || process.env.GEMINI_API_KEY_MAIN || "",
            process.env.GEMINI_FLASH8B_KEY_2 || process.env.GEMINI_API_KEY_BACKUP_1 || "",
            process.env.GEMINI_FLASH8B_KEY_3 || ""
        ].filter(Boolean)
    }
};

// Lưu trữ vị trí Key đang dùng hiện tại của mỗi Bot để xoay vòng
const keyIndexes = {
    "flash": 0,
    "pro": 0,
    "flash-8b": 0
};

/**
 * Hàm gọi API Gemini với tính năng Fail-over tự động chuyển Key
 * @param prompt Nội dung người dùng chat
 * @param botType Loại bot ("flash", "pro", "flash-8b")
 * @param systemContext Ngữ cảnh bổ sung từ Database (nếu có)
 */
export const generateAIResponse = async (prompt: string, botType: "flash" | "pro" | "flash-8b" = "flash", systemContext: string = ""): Promise<{ responseText: string, botName: string, version: string }> => {
    const config = BOT_CONFIGS[botType];
    
    if (!config || config.keys.length === 0) {
        throw new Error(`Không tìm thấy API Key nào cho Bot ${botType}. Vui lòng cấu hình file .env`);
    }

    const retries = config.keys.length; // Số lần thử đúng bằng số lượng key đang có
    
    // Gộp bối cảnh vào câu hỏi thực tế của người dùng
    const finalPrompt = systemContext ? `${systemContext}\n\n[CÂU HỎI CỦA NGƯỜI DÙNG]:\n${prompt}` : prompt;

    for (let i = 0; i < retries; i++) {
        // Lấy Key hiện tại theo vòng xoay
        const currentKeyIndex = keyIndexes[botType];
        const apiKey = config.keys[currentKeyIndex];
        
        try {
            // Khởi tạo mới Client với Key hiện tại (RẤT QUAN TRỌNG ĐỂ ĐỔI KEY THÀNH CÔNG)
            const aiClient = new GoogleGenerativeAI(apiKey);
            const model = aiClient.getGenerativeModel({ model: config.modelName });
            
            const result = await model.generateContent(finalPrompt);
            
            return {
                responseText: result.response.text(),
                botName: config.displayName,
                version: config.modelName
            };
            
        } catch (error: any) {
            console.error(`[Bot ${botType}] Lỗi khi dùng Key thứ ${currentKeyIndex + 1}:`, error.message);
            
            // Xoay sang Key tiếp theo cho lần thử kế
            keyIndexes[botType] = (currentKeyIndex + 1) % config.keys.length;
            
            // Nếu là lỗi Quota/Giới hạn (429, 403) thì tiếp tục lặp thử Key mới
            if (error.message?.includes("429") || error.message?.includes("403") || error.message?.includes("quota") || error.message?.includes("PERMISSION_DENIED")) {
                console.warn(`🔄 Đang tự động đổi sang Key dự phòng tiếp theo...`);
                continue;
            }
            
            // Nếu lỗi khác (ví dụ sai prompt, block safety) thì quăng lỗi luôn
            throw error;
        }
    }

    throw new Error(`Tất cả ${retries} API Keys dự phòng của Bot ${botType} đều không gọi được.`);
};