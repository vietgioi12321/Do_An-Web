import { Request, Response } from 'express';
import LogEntry from '../models/LogEntry';

export const getDeviceErrorStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await LogEntry.aggregate([
            // 1. JOIN với bảng devices để lấy tên thiết bị trực quan
            {
                $lookup: {
                    from: 'devices',
                    localField: 'deviceId',
                    foreignField: 'deviceId',
                    as: 'deviceInfo'
                }
            },
            // 2. Gom nhóm theo deviceId và đếm số lượng
            {
                $group: {
                    _id: '$deviceId',
                    deviceName: { $first: { $arrayElemAt: ['$deviceInfo.name', 0] } },
                    value: { $sum: 1 } // Đếm số lượng log lỗi
                }
            },
            // 3. Định dạng lại cấu trúc trả về sạch sẽ cho Recharts
            {
                $project: {
                    _id: 0,
                    name: { $ifNull: ['$deviceName', 'Thiết bị không xác định'] },
                    value: 1
                }
            }
        ]);

        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};


export const getErrorTimelineStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const timeline = await LogEntry.aggregate([
            // Gom nhóm lỗi theo Ngày-Tháng-Năm trích xuất từ trường timestamp
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 }
                }
            },
            // Sắp xếp ngày tháng tăng dần từ quá khứ đến hiện tại
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    count: 1
                }
            }
        ]);

        res.status(200).json({ success: true, data: timeline });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};