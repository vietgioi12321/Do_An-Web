# 🚀 Real-time Bug Management and Monitoring System

Hệ thống quản lý, giám sát và báo cáo lỗi (Bug) theo thời gian thực. Dự án bao gồm một giao diện Web Dashboard (React) dành cho quản trị viên/nhà phát triển và một Backend (Node.js) xử lý dữ liệu từ các thiết bị thông qua WebSockets (Socket.io) và AI (Google Gemini).

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React, Vite, Socket.io-client
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (Local hoặc Atlas)
- **AI Integration:** Google Gemini API (Phân tích lỗi tự động)

---

## ⚙️ Hướng dẫn cài đặt và chạy dự án

### 1. Yêu cầu hệ thống (Prerequisites)
Đảm bảo máy tính của bạn đã cài đặt các phần mềm sau:
- [Node.js](https://nodejs.org/) (Khuyến nghị bản v18 trở lên)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (Nếu chạy Database ở Local) hoặc một tài khoản MongoDB Atlas.
- Git

### 2. Tải mã nguồn
Mở Terminal/Command Prompt và chạy lệnh sau để tải dự án về máy:
```bash
git clone https://github.com/vietgioi12321/Do_An-Web.git
cd Do_An-Web
```

### 3. Cài đặt thư viện (Dependencies)
Dự án được chia làm 2 phần: `back_end` và `font_end`. Bạn cần cài đặt thư viện cho cả hai.

**Mở Terminal 1 (Dành cho Backend):**
```bash
cd back_end
npm install
```

**Mở Terminal 2 (Dành cho Frontend):**
```bash
cd font_end
npm install
```

### 4. Cấu hình biến môi trường (.env)
Bảo mật hệ thống yêu cầu cấu hình các khóa API và kết nối Database.

Tại thư mục `back_end`, tạo một file có tên `.env` (hoặc copy từ file `.env.example` nếu có) và cấu hình các thông số sau:

```env
# Cổng chạy Backend
PORT=5000

# Kết nối MongoDB (Chọn 1 trong 2)
# Chạy ở Local (Máy cá nhân)
MONGO_URI=mongodb://127.0.0.1:27017/bug_management_db
# Hoặc chạy Cloud (MongoDB Atlas)
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/bug_management_db?retryWrites=true&w=majority

# Chìa khóa bảo mật JWT
JWT_SECRET=ChieuKhoaBiMatCuaBan

# Google Gemini API Keys (Lấy tại https://aistudio.google.com/app/apikey)
GEMINI_API_KEY_MAIN=your_gemini_api_key_here
```

### 5. Khởi động hệ thống

**Chạy Backend (Chạy ở Terminal 1):**
```bash
cd back_end
npm run dev
```
*Server sẽ khởi động tại `http://localhost:5000` và kết nối với MongoDB.*

**Chạy Frontend (Chạy ở Terminal 2):**
```bash
cd font_end
npm run dev
```
*Giao diện Web sẽ tự động mở lên tại `http://localhost:5173`.*

---

## 🌟 Các tính năng chính
- **Cập nhật Real-time (Thời gian thực):** Mọi log lỗi mới nhất từ thiết bị sẽ ngay lập tức được đẩy lên Dashboard thông qua công nghệ WebSocket (Socket.io) mà không cần F5.
- **Phân công và quản lý:** Admin có thể theo dõi và gán các Bug cho từng lập trình viên xử lý.
- **Biểu đồ thống kê:** Trực quan hóa dữ liệu các lỗi theo thiết bị và tần suất theo thời gian.
- **Tích hợp AI (Gemini):** Tự động tóm tắt, chuẩn đoán và đề xuất hướng khắc phục từ ngăn xếp lỗi (Stack trace).

---

## 🤝 Đóng góp (Contributing)
Nếu bạn muốn đóng góp cho dự án:
1. Fork dự án này.
2. Tạo một nhánh tính năng mới (`git checkout -b feature/AmazingFeature`).
3. Commit các thay đổi (`git commit -m 'Thêm một vài tính năng tuyệt vời'`).
4. Push lên nhánh (`git push origin feature/AmazingFeature`).
5. Tạo một Pull Request.

Chúc bạn có những trải nghiệm tuyệt vời với dự án! 🎉
