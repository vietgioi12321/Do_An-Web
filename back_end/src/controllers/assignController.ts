import { Request, Response } from 'express';
import Assign from '../models/Assign'; // Import Model Log của bạn
import LogEntry from '../models/LogEntry'; // Model LogEntry của bạn

export const getAssign = async (req: Request, res: Response): Promise<void> => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

        const logs = await LogEntry.aggregate([
            { $sort: { timestamp: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'devices',          
                    localField: 'deviceId',    
                    foreignField: 'deviceId',  
                    as: 'deviceInfo'           
                }
            },
            {
                $lookup: {
                    from: 'users',            
                    localField: 'userId',      
                    foreignField: 'userId',    
                    as: 'developerInfo'        
                }
            },
            // 🌟 Tinh chỉnh lại tầng này để chỉ giữ đúng các trường bạn cần
            {
                $project: {
                    _id: 0, // 0 nghĩa là ẩn trường _id mặc định của MongoDB đi
                    logEntryId: '$logEntryId',
                    errorMessage: 1, // 1 nghĩa là chấp nhận lấy trường này
                    
                    // Lấy Tên thiết bị từ mảng lookup
                    deviceName: { 
                        $ifNull: [ { $arrayElemAt: ['$deviceInfo.name', 0] }, 'Thiết bị không xác định' ] 
                    },
                    
                    // Lấy Phiên bản hệ điều hành từ mảng lookup
                    osVersion: { 
                        $ifNull: [ { $arrayElemAt: ['$deviceInfo.osVersion', 0] }, 'Không rõ phiên bản' ] 
                    },
                    
                    // Lấy Tên Developer từ mảng lookup
                    developerName: {
                        $cond: {
                            // 1. Điều kiện: Nếu userId bằng 1
                            if: { $eq: ['$userId', 1] }, 
                            
                            // 2. Đúng thì trả về 'Admin'
                            then: 'Admin', 
                            
                            // 3. Sai (userId khác 1) thì bốc tên từ collection User lên như cũ
                            else: { 
                                $ifNull: [ { $arrayElemAt: ['$developerInfo.nameUser', 0] }, 'Chưa có Developer' ] 
                            }
                        }
                    },
                    
                    // Tính toán chuỗi trạng thái hiển thị
                    assignStatus: {
                        $cond: { if: { $eq: ['$userId', 1] }, then: 'Chưa gán', else: 'Đang thực hiện' }
                    },
                    
                    // Trường 'action': Trả về trạng thái nút bấm tương ứng cho Front-end dễ xử lý
                    action: {
                        $cond: { if: { $eq: ['$userId', 1] }, then: 'Assign', else: 'UnAssign' }
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Tải danh sách Assign thành công!',
            count: logs.length,
            data: logs
        });

    } catch (error: any) {
        console.error('Lỗi khi lấy dữ liệu Assign Log:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra ở hệ thống phía máy chủ không thể lấy được log!'
        });
    }
};


// API POST: Thêm mới người dùng
export const addAssign = async (req: Request, res: Response): Promise<void> => {
    try {
      // 1. Lấy toàn bộ các trường dữ liệu mà Client (Postman/Mobile) gửi lên
      const { status, action, userId, logEntryId } = req.body;
  
      // 2. Tiến hành tạo mới bản ghi trong MongoDB (Trường userId tự động tăng sẽ tự xử lý ngầm)
      const newAssign = await Assign.create({
        status, action, userId, logEntryId
      });
  
      // 3. Trả về thông báo thành công cùng dữ liệu vừa tạo
      res.status(201).json({
        message: "Tạo thành công Assign!",
        data: newAssign
      });
    } catch (error: any) {
      // Trả về lỗi nếu trùng email (nếu cấu hình unique) hoặc thiếu trường bắt buộc
      res.status(500).json({ error: error.message });
    }
  };