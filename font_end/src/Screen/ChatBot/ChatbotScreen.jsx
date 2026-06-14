import React, { useState } from "react";
import {useChatBotData, handleKeyDown,handleSendMessage} from '../../services/chatBotService'
import './style/AIChatbotDashboard.css'; // Sử dụng CSS mới tạo

function ChatBotScreen() {
    // userId lấy từ local storage, chú ý key là 'userId' chứ không phải 'UserId'
    const [userId] = useState(localStorage.getItem('userId') || "1");
    const {chatLogs, setChatLogs, loading, messagesEndRef} = useChatBotData(userId);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [botType, setBotType] = useState("flash"); // flash, pro, flash-8b

    // Hàm định dạng hiển thị giờ phút ngắn gọn
    const formatTime = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Hàm tách lấy tiêu đề lỗi (chứa icon 📌) nếu có, để hiển thị khung đỏ nổi bật
    const renderBotMessage = (text) => {
        if (!text) return null;
        
        // Cố gắng tìm dòng có chứa 📌
        const lines = text.split('\n');
        const titleIndex = lines.findIndex(line => line.includes('📌'));
        
        if (titleIndex !== -1) {
            const titleLine = lines[titleIndex];
            // Các dòng còn lại
            const restOfText = lines.filter((_, idx) => idx !== titleIndex).join('\n').trim();
            
            return (
                <>
                    <div className="bubble-error-title">{titleLine}</div>
                    <div className="bubble-text">{restOfText}</div>
                </>
            );
        }

        // Nếu không có title nổi bật thì in ra bình thường
        return <div className="bubble-text">{text}</div>;
    };

    return (
        <div className="web-chat-container" style={{ height: '100vh', margin: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            {/* THANH TIÊU ĐỀ TRÊN CÙNG (HEADER) */}
            <div className="web-chat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="header-info">
                    <h3>Chat AI - Console Log Monitor</h3>
                </div>
                <div>
                    <select 
                        value={botType} 
                        onChange={(e) => setBotType(e.target.value)}
                        style={{ padding: '6px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                    >
                        <option value="flash">Gemini 2.5 Flash (Tốc độ cao)</option>
                        <option value="pro">Gemini 1.5 Pro (Phân tích sâu)</option>
                        <option value="flash-8b">Gemini Flash-8B (Tối ưu)</option>
                    </select>
                </div>
            </div>

            {/* VÙNG HIỂN THỊ NỘI DUNG CUỘC TRÒ CHUYỆN */}
            <div className="web-chat-body">
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: 20 }}>
                        Đang tải lịch sử chat...
                    </div>
                ) : chatLogs.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: 20 }}>
                        Chưa có đoạn hội thoại nào.
                    </div>
                ) : (
                    chatLogs.map((log) => (
                        <React.Fragment key={log._id || log.chatBotLogId}>
                            
                            {/* 🔴 TIN NHẮN CỦA USER */}
                            {log.messageUser && (
                                <div className="message-row user-row">
                                    <div className="message-bubble user-bubble">
                                        <div className="bubble-sender-name">Tôi (Dev)</div>
                                        <div className="bubble-text">{log.messageUser}</div>
                                        <div className="bubble-time">{formatTime(log.timestamp || new Date())}</div>
                                    </div>
                                </div>
                            )}

                            {/* 🔵 PHẢN HỒI CỦA AI */}
                            {log.messageChat && (
                                <div className="message-row ai-row">
                                    <div className="message-bubble ai-bubble">
                                        <div className="bubble-sender-name">
                                            {log.chatBotName || "AI Bug Assistant"} ({log.version || "Gemini"})
                                        </div>
                                        
                                        {renderBotMessage(log.messageChat)}

                                        <div className="bubble-time">{formatTime(log.timestamp || new Date())}</div>
                                    </div>
                                </div>
                            )}

                        </React.Fragment>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* THANH Ô NHẬP INPUT GỬI TIN NHẮN Ở ĐÁY */}
            <div className="web-chat-footer">
                <input 
                    type="text" 
                    placeholder={isLoading ? "Gemini đang suy nghĩ..." : "Nhập nội dung phản hồi hoặc mã lỗi Stack Trace..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, inputText, setInputText, setIsLoading, userId, setChatLogs, botType)}
                    disabled={isLoading}
                />
                <button 
                    className="web-send-btn" 
                    onClick={() => handleSendMessage(inputText, setInputText, setIsLoading, userId, setChatLogs, botType)}
                    disabled={isLoading}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ChatBotScreen;