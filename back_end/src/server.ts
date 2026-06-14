import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import aiClient from "../config/geminiConfig"
import { socketService } from '../services/socketService'; // Import Service vừa tạo

import './models/Counter';

import activitylogRouter from './routes/activityLogRouter';
import assignRouter from './routes/assignRouter';
import chatbotlogRouter from './routes/chatBotLogRouter';
import deviceRouter from './routes/deviceRouter';
import logentryRouter from './routes/logEntryRouter';
import reportRouter from './routes/reportRouter';
import sussgesionRouter from './routes/sussgesionRouter';
import userRoutes from './routes/userRoute';
import overviewRouter from './routes/overviewRouter';


dotenv.config();

const app = express(); 
const server = http.createServer(app);

// 2. KÍCH HOẠT CORS (Bắt buộc phải đặt TRƯỚC các dòng app.use các Route API)
app.use(cors({
  origin: 'http://localhost:5173', // Cho phép duy nhất ông React này gọi tới
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Khởi tạo Socket.io thông qua service duy nhất
const io = socketService.init(server);
app.set('io', io);

const PORT = process.env.PORT || 5000;

connectDB();
aiClient;

app.use(express.json());

app.use('/api/activitylog',activitylogRouter)
app.use('/api/assign',assignRouter)
app.use('/api/chatbotlog',chatbotlogRouter)
app.use('/api/device',deviceRouter)
app.use('/api/logentry',logentryRouter)
app.use('/api/report',reportRouter)
app.use('/api/sussgesion',sussgesionRouter)
app.use('/api/users', userRoutes);
app.use('/api/overview', overviewRouter);

// ✅ ĐÃ SỬA: Thay đổi Request/Response thành express.Request/express.Response để tránh lỗi dòng này
app.get('/', (req: express.Request, res: express.Response) => {
    console.log("🔔 [GET] Có yêu cầu truy cập vào trang chủ API!")
    res.send('API Giám sát hệ thống đang chạy...');
});

server.listen(PORT, () => {
  console.log(`⚡ Server đang chạy tại cổng: ${PORT}`);
});