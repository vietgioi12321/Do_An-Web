import { Request, Response } from 'express';
import LogEntry from '../models/LogEntry';
import Device from '../models/Device';

// API: Lấy thống kê số lượng lỗi theo từng thiết bị (Dùng cho Pie Chart)
export const getDeviceErrorStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        let queryCondition: any = {};
        
        // Phân quyền: Nếu không phải admin (1), chỉ lấy lỗi của dev đó
        if (userId && userId !== "1") {
            queryCondition.userId = parseInt(userId as string);
        }

        // 1. Lấy danh sách log
        const logs = await LogEntry.find(queryCondition).lean();

        // 2. Lấy danh sách thiết bị để map tên
        const devices = await Device.find({}).lean();
        const deviceMap = new Map();
        devices.forEach(d => {
            deviceMap.set(d.deviceUniqueId, d.device?.model || 'Thiết bị không xác định');
        });

        // 3. Đếm số lượng lỗi trên mỗi thiết bị
        const statsMap = new Map();
        logs.forEach(log => {
            const deviceName = deviceMap.get(log.deviceUniqueId) || 'Thiết bị không xác định';
            const currentStats = statsMap.get(deviceName) || { value: 0, errorCount: 0, warningCount: 0 };
            
            currentStats.value += 1;
            const level = log.logLevel ? log.logLevel.toLowerCase() : '';
            if (level.includes('warn')) {
                currentStats.warningCount += 1;
            } else {
                // Default everything else (e.g. Error, Exception, Fatal) to errorCount
                currentStats.errorCount += 1;
            }
            statsMap.set(deviceName, currentStats);
        });

        // 4. Chuyển đổi định dạng cho Recharts PieChart [{ name, value, errorCount, warningCount }]
        const data = Array.from(statsMap, ([name, stats]) => ({ 
            name, 
            value: stats.value,
            errorCount: stats.errorCount,
            warningCount: stats.warningCount
        }));

        // Sắp xếp theo số lượng lỗi giảm dần để biểu đồ đẹp hơn
        data.sort((a, b) => b.value - a.value);

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Lỗi khi lấy getDeviceErrorStats:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// API: Lấy thống kê số lượng lỗi phát sinh theo thời gian (Dùng cho Line Chart)
export const getErrorTimelineStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        let queryCondition: any = {};
        
        // Phân quyền
        if (userId && userId !== "1") {
            queryCondition.userId = parseInt(userId as string);
        }

        // Lấy log và sắp xếp theo thời gian tăng dần
        const logs = await LogEntry.find(queryCondition).sort({ timestamp: 1 }).lean();

        const statsMap = new Map();
        logs.forEach(log => {
            // Chuyển timestamp thành định dạng YYYY-MM-DD
            const dateStr = new Date(log.timestamp).toISOString().split('T')[0];
            statsMap.set(dateStr, (statsMap.get(dateStr) || 0) + 1);
        });

        // Chuyển đổi định dạng cho Recharts LineChart [{ date, count }]
        const data = Array.from(statsMap, ([date, count]) => ({ date, count }));

        // Nếu không có dữ liệu, trả về mảng rỗng
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Lỗi khi lấy getErrorTimelineStats:', error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};
