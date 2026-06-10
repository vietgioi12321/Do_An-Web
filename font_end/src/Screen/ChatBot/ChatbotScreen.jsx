import React, { useState } from "react";
import {useChatBotData, handleKeyDown,handleSendMessage} from '../../services/chatBotService'
import ChatBotStyle from "../../../assets/style/ChatBotStyle";

function ChatBotScreen() {
    const {chatLogs,loading,messagesEndRef} = useChatBotData()
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {userId, setUserId} = useState(localStorage.getItem('UserId'))

    return (
        <div className="chatbot-wrapper" style={{ height: '100vh'}}>
            
            {/* CỬA SỔ SIDEBAR CHAT CỐ ĐỊNH BÊN PHẢI */}
            <div className="chatbot-window" style={ChatBotStyle.chatbot_window}>
                
                {/* 1. Thanh Header */}
                <div className="chatbot-header" style={ChatBotStyle.chatbot_header}>
                    <span style={{ color: '#9ca3af', fontSize: '14px' }}>Chat AI</span>
                </div>
                
                {/* 2. Danh sách các bong bóng chat */}
                <div className="chatbot-messages" style={ChatBotStyle.chatbot_messages}>
                    
                    {loading ? (
                        <div style={ChatBotStyle.chat_text}>
                            Đang tải lịch sử chat...
                        </div>
                    ) : chatLogs.length === 0 ? (
                        <div style={ChatBotStyle.chat_text}>
                            Chưa có đoạn hội thoại nào.
                        </div>
                    ) : (
                        // Lặp qua danh sách log từ DB
                        chatLogs.map((log) => (
                            <React.Fragment key={log._id || log.chatBotLogId}>
                                
                                {/* 🔴 TIN NHẮN CỦA USER (Hiển thị bên phải) */}
                                {log.messageUser && (
                                    <div className="message-row user" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <div className="msg-bubble" style={ChatBotStyle.msg_bubble}>
                                            {log.messageUser}
                                        </div>
                                    </div>
                                )}

                                {/* 🔵 PHẢN HỒI CỦA BOT (Hiển thị bên trái) */}
                                {log.messageChat && (
                                    <div className="message-row bot" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div className="msg-bubble" style={ChatBotStyle.msg_bubble}>
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
                <div className="chatbot-input-area" style={ChatBotStyle.chatbot_input_area}>
                    <input type="text" 
                            placeholder={isLoading ? "Gemini đang suy nghĩ..." : "Nhập tin nhắn..."}
                            style={ChatBotStyle.input} 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, inputText, setInputText, setIsLoading, userId)}
                            disabled={isLoading} />

                    <button className="send-chat-btn" 
                            onClick={() => handleSendMessage(inputText, setInputText, setIsLoading, userId)}
                            disabled={isLoading} // Khóa nút khi đang load
                            style={ChatBotStyle.button} >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBotScreen;