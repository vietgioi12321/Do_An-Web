// 1. Import thực thể aiClient sử dụng cú pháp ES6 chuẩn TypeScript
// Hãy chỉnh lại đường dẫn cho đúng với cấu trúc thư mục thực tế của bạn
import aiClient from "../config/geminiConfig";

/**
 * Hàm gửi prompt và nhận phản hồi từ Gemini API trên Server
 * @param prompt - Câu hỏi hoặc ngữ cảnh bạn muốn AI xử lý (định dạng string)
 * @returns Khối Promise trả về dữ liệu chuỗi văn bản sạch từ AI
 */
export async function generateAIResponse(prompt: string): Promise<string> {
    try {
        // 2. Lựa chọn model 'gemini-2.5-flash' tối ưu tốc độ cho chatbot real-time
        const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 3. Gửi câu lệnh (prompt) lên Google API
        const result = await model.generateContent(prompt);
        
        // 4. Trích xuất và trả về văn bản phản hồi sạch
        return result.response.text();
    } catch (error: any) {
        console.error("❌ Lỗi xảy ra tại Gemini Service trên Server:", error);
        throw new Error("Không thể kết nối hoặc xử lý dữ liệu từ Gemini API: " + error.message);
    }
}