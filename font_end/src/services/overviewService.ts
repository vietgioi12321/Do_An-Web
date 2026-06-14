// useOverviewData.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export function useOverviewData(userId) {
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const t = new Date().getTime();
                const [pieRes, lineRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/overview/getDeviceErrorStats/${userId}?t=${t}`),
                    axios.get(`http://localhost:5000/api/overview/getErrorTimelineStats/${userId}?t=${t}`)
                ]);

                if (pieRes.data.success) setPieData(pieRes.data.data);
                if (lineRes.data.success) setLineData(lineRes.data.data);

            } catch (error) {
                console.error("Lỗi khi kết nối dữ liệu báo cáo MongoDB:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchDashboardData();
        }

        // Lắng nghe tín hiệu từ Backend khi có lỗi mới được đẩy lên
        socket.on('LOGENTRY_CHANGED', () => {
            console.log("📡 OverviewTab nhận tín hiệu lỗi mới. Đang cập nhật biểu đồ...");
            if (userId) fetchDashboardData();
        });

        // Dọn dẹp kết nối khi unmount
        return () => {
            socket.off('LOGENTRY_CHANGED');
        };
    }, [userId]);

    // Trả về các dữ liệu cần thiết cho UI sử dụng
    return { pieData, lineData, loading };
}