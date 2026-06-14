import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

class SocketService {
    private io: SocketServer | null = null;

    // 1. Hàm khởi tạo cấu hình (Chỉ gọi 1 lần duy nhất ở file server.ts)
    public init(httpServer: HttpServer): SocketServer {
        this.io = new SocketServer(httpServer, {
            cors: {
                origin: "*", // Mở cổng cho React kết nối
                methods: ["GET", "POST"]
            }
        });

        console.log("🔌 Socket.io Service đã được khởi tạo thành công!");

        // Lắng nghe kết nối thử nghiệm
        this.io.on('connection', (socket) => {
            console.log(`🔌 Client kết nối Real-time thành công: ${socket.id}`);
            
            socket.on('disconnect', () => {
                console.log('❌ Một Client đã ngắt kết nối.');
            });
        });

        return this.io;
    }

    // 2. Hàm dùng chung để phát tín hiệu (Bất kỳ Controller nào cũng gọi được)
    public emitToAll(eventName: string, payload: any): void {
        if (!this.io) {
            console.warn("⚠️ Chưa khởi tạo Socket.io! Hãy gọi init() trước.");
            return;
        }
        this.io.emit(eventName, payload);
    }
}

// Xuất ra một thực thể duy nhất (Singleton) để dùng chung toàn hệ thống
export const socketService = new SocketService();