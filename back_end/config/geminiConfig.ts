import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// 1. Lấy API Key từ biến môi trường Node.js (process.env)
const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
    console.warn("⚠️ Cảnh báo: Chưa cấu hình GEMINI_API_KEY trong file .env!");
}

// 2. Khởi tạo thực thể GoogleGenerativeAI bằng chuỗi string apiKey bản cũ/ổn định
// Thực thể này sẽ được dùng chung cho toàn bộ ứng dụng Server (Singleton Pattern)
const aiClient = new GoogleGenerativeAI(apiKey);
export default aiClient