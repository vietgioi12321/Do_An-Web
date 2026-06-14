import { useState,useEffect } from "react";
import axios from "axios";

import { io } from 'socket.io-client';
// 1. Kết nối tới địa chỉ URL của Back-end Node.js
const socket = io('http://localhost:5000');

export function useActivityData(userID){
    const [activityLogs, setActivityLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            // Đã đổi URL để nhận userId params
            const response = await axios.get(`http://localhost:5000/api/activitylog/getActivityLog/${userID}`);
                
                // Nếu API trả về success = true, nạp mảng data vào state
                if (response.data.success) {
                    setActivityLogs(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu Activity Log từ Server:", error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchLogs();

        const handleActivityChange = (payload: any) => {
            console.log("📡 Tín hiệu Activity Log Real-time:", payload);
            
            // Tự động gọi lại API để làm mới toàn bộ danh sách (đảm bảo tính đồng bộ dữ liệu)
            fetchLogs();
        };

        // 🔥 LẮNG NGHE SỰ KIỆN REAL-TIME KHI CÓ ACTIVITY LOG MỚI
        socket.on('ACTIVITYLOG_CHANGED', handleActivityChange);

        // Dọn dẹp kết nối khi rời trang
        return () => {
            socket.off('ACTIVITYLOG_CHANGED', handleActivityChange);
        };
    }, [userID]);
    return {activityLogs,loading}
}

export function useAssignData(userID){
    // 1. Khởi tạo trạng thái lưu danh sách lỗi lấy từ API
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBugs = async () => {
        try {
            // Thêm query timestamp để chống trình duyệt cache kết quả cũ
            const t = new Date().getTime();
            const response = await axios.get(`http://localhost:5000/api/assign/getAssign?t=${t}`);
            if (response.data.success) {
                setBugs(response.data.data);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách gán lỗi từ API:", error);
        } finally {
            setLoading(false);
        }
    };


    // 2. Tự động gọi API khi giao diện được tải lên
    useEffect(() => {
        fetchBugs();

        const handleLogChange = (payload: any) => {
            console.log("📡 Tín hiệu Real-time mới:", payload);
            const {data } = payload;

            // Nếu là Dev thường và lỗi này không gán cho mình thì bỏ qua
            if (String(userID) !== "1" && String(data.userId) !== String(userID)) {
                return;
            }
            setBugs((prev) => prev.some(log => log.logEntryId === data.logEntryId) ? prev : [data, ...prev]);
        };

        socket.on('LOGENTRY_CHANGED', handleLogChange);

        const handleAssignChange = (payload: any) => {
            console.log("📡 Tín hiệu gán lỗi Real-time:", payload);
            const { logEntryId, newUserId, status } = payload;

            // Nếu là Dev thường thì chỉ cần reload lại danh sách để tự mất đi (nếu bị unassign)
            if (String(userID) !== "1") {
                fetchBugs();
                return;
            }

            // Nếu là Admin thì cập nhật luôn state để đổi màu mà ko tốn thêm req
            setBugs((prevBugs) => 
                prevBugs.map((bug) => {
                    if (bug.logEntryId === logEntryId) {
                        return {
                            ...bug,
                            userId: newUserId,
                            assignStatus: newUserId === 1 ? "Chưa gán cho Developer" : status,
                            isChange: false // Reset lại trạng thái nút bấm
                        };
                    }
                    return bug;
                })
            );
        };

        // 🔥 LẮNG NGHE REAL-TIME KHI CÓ SỰ THAY ĐỔI DEVELOPER (ASSIGN)
        socket.on('ASSIGN_CHANGED', handleAssignChange);

        // Cleanup
        return () => {
            socket.off('LOGENTRY_CHANGED', handleLogChange);
            socket.off('ASSIGN_CHANGED', handleAssignChange);
        };
    }, []);
    return {bugs,loading,fetchBugs}
}


export const handleUpdateDeveloper = async (bugId: number, newDevId: number) => {
    console.log("newDevId",newDevId)
    try {
      // 1. Gửi lệnh cập nhật xuống Backend API để lưu vào MongoDB
      const response = await fetch(`http://localhost:5000/api/assign/update_assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({logEntryId: bugId, userId: newDevId }),
      });
      return true;
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      return false;
    }
    
};

