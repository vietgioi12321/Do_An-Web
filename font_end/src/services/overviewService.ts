// useOverviewData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useOverviewData() {
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Gọi đồng thời cả 2 API thống kê báo cáo lỗi
                const [pieRes, lineRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/bugs/getDeviceErrorStats'),
                    axios.get('http://localhost:5000/api/bugs/getErrorTimelineStats')
                ]);

                if (pieRes.data.success) setPieData(pieRes.data.data);
                if (lineRes.data.success) setLineData(lineRes.data.data);

            } catch (error) {
                console.error("Lỗi khi kết nối dữ liệu báo cáo MongoDB:", error);
                // Gieo dữ liệu fallback giả lập nếu mất kết nối server
                setPieData([
                    { name: 'Google Pixel 6 (Emulator)', value: 4 },
                    { name: 'Samsung Galaxy S23', value: 12 },
                    { name: 'Thiết bị không xác định', value: 2 }
                ]);
                setLineData([
                    { date: '2026-06-01', count: 5 },
                    { date: '2026-06-02', count: 12 },
                    { date: '2026-06-03', count: 8 },
                    { date: '2026-06-04', count: 15 },
                    { date: '2026-06-05', count: 21 },
                    { date: '2026-06-06', count: 18 }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Trả về các dữ liệu cần thiết cho UI sử dụng
    return { pieData, lineData, loading };
}