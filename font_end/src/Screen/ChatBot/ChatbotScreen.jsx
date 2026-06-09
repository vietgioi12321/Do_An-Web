import React from "react";
import {useChatBotData} from '../../services/chatBotService'
import ChatBotStyle from "../../../assets/style/ChatBotStyle";

function ChatBotScreen() {
    const {chatLogs,loading,messagesEndRef} = useChatBotData()

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
                    <input type="text" placeholder="Nhập tin nhắn..." style={ChatBotStyle.input} />
                    <button className="send-chat-btn" style={ChatBotStyle.button} >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatBotScreen;