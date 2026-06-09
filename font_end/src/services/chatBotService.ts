import {useState,useEffect,useRef} from 'react'
import axios from 'axios'

export function useChatBotData(){
    // 1. State lưu danh sách log chat lấy từ MongoDB về
    const [chatLogs, setChatLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // 2. Gọi API lấy dữ liệu khi component được load
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const userId = 1; // ID của user hiện tại (có thể thay bằng id động từ hệ thống auth)
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

// export function han