import {useState,useEffect,useRef} from 'react'
import axios from 'axios'

export function useChatBotData(userId=1){
    // 1. State lưu danh sách log chat lấy từ MongoDB về
    const [chatLogs, setChatLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // 2. Gọi API lấy dữ liệu khi component được load
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chatbotlog/getChatBotLog/${userId}`);
                
                if (response.data.success) {
                    setChatLogs(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử chat từ MongoDB:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatHistory();
    }, []);

    // 3. Tự động cuộn xuống tin nhắn cuối cùng khi dữ liệu load xong
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatLogs]);

    return {chatLogs,loading,messagesEndRef}
}

export const handleSendMessage = async (
        inputText: string, 
        setInputText: (val: string) => void,
        setIsLoading: (loading: boolean) => void, 
        userId: string
        ) => {
        if (!inputText.trim()) return;

        const userPrompt = inputText.trim();

        try {
            console.log("🚀 Đang gửi prompt lên server:", userPrompt);

            // Gọi API gửi lên Server Node.js
            const result = await axios.post(`http://localhost:5000/api/chatbotlog/postChatBotLog`, {
                userId: userId, 
                bugId: null, // Truyền ID bug vào đây nếu đứng ở trang chi tiết lỗi
                prompt: userPrompt,
            });

            if (result.data.success) {
                console.log("🟢 Phản hồi từ Gemini:", result.data.response);
                // TODO: Tại đây bạn setMessages((prev) => [...prev, { text: result.data.response, sender: 'bot' }]) 
                // để hiển thị câu trả lời lên khung chat.
            }
        } catch (error: any) {
            console.error("❌ Lỗi khi chat với Bot:", error.message);
            alert("Không thể kết nối tới Chatbot: " + error.message);
        } finally {
            // Tắt trạng thái loading cho dù thành công hay thất bại
            setIsLoading(false)
        }
    };

    // Hàm xử lý khi người dùng nhấn phím Enter trên bàn phím thay vì click chuột vào nút gửi
export const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>, 
    inputText: string, 
    setInputText: (val: string) => void,
    setIsLoading: (loading: boolean) => void, 
    userId: string) => {
    
    if (e.key === "Enter") {
        handleSendMessage(inputText, setInputText, setIsLoading, userId);
    }
};
    