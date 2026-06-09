import React, { useState } from 'react';
import './style/AIChatbotDashboard.css'; // File CSS cấu trúc giao diện ở bên dưới

const MOCK_CHAT_HISTORY = [
    {
      _id: 201,
      chatbotName: "AI Bug Assistant",
      version: "Gemini 2.5 Flash",
      userId: 1,
      userName: "Nguyễn Văn Thắng (Dev)",
      sender: "user",
      message: "Fix lỗi này kiểu gì bot: 'Element implicitly has an any type because type typeof globalThis has no index signature'?",
      timestamp: "2026-05-29T09:44:10.000Z"
    },
    {
      _id: 401,
      chatbotName: "AI Bug Assistant",
      version: "Gemini 2.5 Flash",
      sender: "ai",
      title: "TypeScript Error: Index Signature",
      message: "📍 Vị trí: src/layout/Header.tsx (Dòng 3)\n\n🔍 Nguyên nhân: Cấu hình strict của TypeScript chặn việc gán động thuộc tính mới vào object 'global' khi chưa khai báo kiểu dữ liệu.\n\n🛠️ Các bước xử lý:\n1. Mở file src/layout/Header.tsx.\n2. Ép kiểu nhanh cho object global bằng cú pháp: (global as any).SERVER_URL = 'your_url';\n3. Hoặc tạo file global.d.ts ở thư mục gốc để định nghĩa interface chuẩn cho namespace NodeJS.",
      timestamp: "2026-05-29T09:44:22.000Z"
    },
    {
      _id: 202,
      chatbotName: "AI Bug Assistant",
      version: "Gemini 2.5 Flash",
      userId: 1,
      userName: "Nguyễn Văn Thắng (Dev)",
      sender: "user",
      message: "Lỗi này nữa: Android Emulator gọi fetch lên localhost:3000 bị dính 'Network request failed'.",
      timestamp: "2026-05-29T09:49:30.000Z"
    },
    {
      _id: 402,
      chatbotName: "AI Bug Assistant",
      version: "Gemini 2.5 Flash",
      sender: "ai",
      title: "Expo/Android Network Error",
      message: "📍 Vị trí: src/services/api.ts (Hàm fetch API)\n\n🔍 Nguyên nhân: Android Emulator chạy trên sandbox riêng. Nó hiểu 'localhost' hoặc '127.0.0.1' là chính chiếc điện thoại ảo chứ không phải máy tính chạy backend Node.js.\n\n🛠️ Các bước xử lý:\n1. Thay thế địa chỉ 'localhost:3000' trong URL fetch thành '10.0.2.2:3000' (IP đặc quyền trỏ về máy tính).\n2. Kiểm tra file cấu hình Backend, đảm bảo server đang listen ở host '0.0.0.0' thay vì '127.0.0.1'.\n3. Khởi động lại Metro Bundler bằng lệnh: npx expo start -c",
      timestamp: "2026-05-29T09:49:45.000Z"
    }
  ];

export default function AIChatbotDashboard() {
  const [chatList, setChatList] = useState(MOCK_CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');

  // Xử lý khi nhấn nút gửi tin nhắn trên Web Admin
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      _id: Date.now(),
      sender: "user",
      userName: "Nguyễn Văn Thắng (Admin)",
      message: inputValue,
      timestamp: new Date().toISOString()
    };

    setChatList([...chatList, userMsg]);
    setInputValue('');

    // Giả lập Server gọi sang API Gemini 2.5 Flash phản hồi lại
    setTimeout(() => {
      const aiReply = {
        _id: Date.now() + 1,
        sender: "ai",
        chatbotName: "AI Bug Assistant",
        version: "Gemini 2.5 Flash",
        message: "Hệ thống quản trị Server đã ghi nhận phản hồi. Tôi đang kiểm tra lại lịch sử hoạt động (ActivityLog) của bạn...",
        timestamp: new Date().toISOString()
      };
      setChatList(prev => [...prev, aiReply]);
    }, 1000);
  };

  // Hàm định dạng hiển thị giờ phút ngắn gọn
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="web-chat-container">
      {/* THANH TIÊU ĐỀ TRÊN CÙNG (HEADER) */}
      <div className="web-chat-header">
        <div className="header-info">
          <h3>Chat AI - Console Log Monitor</h3>
        </div>
      </div>

      {/* VÙNG HIỂN THỊ NỘI DUNG CUỘC TRÒ CHUYỆN */}
      <div className="web-chat-body">
        {chatList.map((item) => {
          const isUser = item.sender === 'user';
          return (
            <div 
              key={item._id} 
              className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}
            >
              <div className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
                {/* Tên người gửi / Tên AI Model */}
                <div className="bubble-sender-name">
                  {isUser ? item.userName : `${item.chatbotName} (${item.version})`}
                </div>

                {/* Tiêu đề mã lỗi nếu có (Dữ liệu từ bảng Suggestions) */}
                {!isUser && item.title && <div className="bubble-error-title">📌 {item.title}</div>}

                {/* Nội dung tin nhắn */}
                <div className="bubble-text">{item.message}</div>

                {/* Mốc thời gian */}
                <div className="bubble-time">{formatTime(item.timestamp)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* THANH Ô NHẬP INPUT GỬI TIN NHẮN Ở ĐÁY */}
      <form className="web-chat-footer" onSubmit={handleSendMessage}>
        <input 
          type="text" 
          placeholder="Nhập nội dung phản hồi hoặc mã lỗi Stack Trace..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="web-send-btn">
          {/* Icon mũi tên gửi tin nhắn bằng SVG giống hệt trong ảnh */}
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}