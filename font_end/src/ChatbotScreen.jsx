import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatBotScreen() {
    // 1. State lưu danh sách log chat lấy từ MongoDB về
    const [chatLogs, setChatLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

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

    return (
        <div className="chatbot-wrapper" style={{ height: '100vh'}}>
            
            {/* CỬA SỔ SIDEBAR CHAT CỐ ĐỊNH BÊN PHẢI */}
            <div className="chatbot-window" style={{ background: '#F4F6F8', height: '100%', display: 'flex', flexDirection: 'column' }}>
                
                {/* 1. Thanh Header */}
                <div className="chatbot-header" style={{ height: 40, border: '1px solid #cbd5e1', borderRadius: '4px', background: 'white', display: 'flex', alignItems: 'center', padding: '0 10px', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9ca3af', fontSize: '14px' }}>Chat AI</span>
                </div>
                
                {/* 2. Danh sách các bong bóng chat */}
                <div className="chatbot-messages" style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    {loading ? (
                        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginTop: '20px' }}>
                            Đang tải lịch sử chat...
                        </div>
                    ) : chatLogs.length === 0 ? (
                        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px', marginTop: '20px' }}>
                            Chưa có đoạn hội thoại nào.
                        </div>
                    ) : (
                        // Lặp qua danh sách log từ DB
                        chatLogs.map((log) => (
                            <React.Fragment key={log._id || log.chatBotLogId}>
                                
                                {/* 🔴 TIN NHẮN CỦA USER (Hiển thị bên phải) */}
                                {log.messageUser && (
                                    <div className="message-row user" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div className="msg-bubble" style={{ background: 'white', color: '#000', padding: '10px 15px', borderRadius: '12px 4px 12px 12px', maxWidth: '75%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '14px', lineHeights: 1.5 }}>
                                            {log.messageUser}
                                        </div>
                                    </div>
                                )}

                                {/* 🔵 PHẢN HỒI CỦA BOT (Hiển thị bên trái) */}
                                {log.messageChat && (
                                    <div className="message-row bot" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div className="msg-bubble" style={{ background: 'white', color: '#000', padding: '10px 15px', borderRadius: '4px 12px 12px 12px', maxWidth: '75%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '14px', lineHeights: 1.5 }}>
                                            {log.messageChat}
                                        </div>
                                    </div>
                                )}

                            </React.Fragment>
                        ))
                    )}
                    
                    {/* Điểm neo để tự động cuộn màn hình xuống đáy */}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* 3. Vùng Input bám sát viền đáy */}
                <div className="chatbot-input-area" style={{ display: 'flex', background: 'white', borderTop: '1px solid #cbd5e1', height: '50px', alignItems: 'center', padding: '0 10px', flexShrink: 0 }}>
                    <input type="text" placeholder="Nhập tin nhắn..." style={{ flex: 1, border: 'none', outline: 'none', height: '100%', fontSize: '14px' }} />
                    <button className="send-chat-btn" style={{ background: '#0ea5e9', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifycontent: 'center' }}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>

            </div>

        </div>
    );
}

export default ChatBotScreen;