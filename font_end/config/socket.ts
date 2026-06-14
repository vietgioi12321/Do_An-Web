import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// Khởi tạo một kết nối duy nhất xài chung cho toàn bộ app React
export const socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true
});