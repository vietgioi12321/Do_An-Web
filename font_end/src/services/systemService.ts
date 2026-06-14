import { useState,useEffect } from "react";
import axios from "axios";

import { io } from 'socket.io-client';
// 1. Kết nối tới địa chỉ URL của Back-end Node.js
const socket = io('http://localhost:5000');

export function useDeviceData(userID: string | null) {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Nếu chưa lấy được userID từ localStorage thì không làm gì cả
        if (!userID) return;

        const fetchDevices = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/device/getDevice/${userID}`);
                const deviceData = response.data.data || response.data;
                if (Array.isArray(deviceData)) {
                    setDevices(deviceData);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu danh sách thiết bị:", error);
            } finally {
                setLoading(false);
            }
        };

        // 1. Gọi API nạp dữ liệu gốc ban đầu khi truy cập trang
        fetchDevices();

        // 2. 🔥 LẮNG NGHE REAL-TIME ĐỒNG BỘ
        socket.on('DEVICE_CHANGED', (payload: any) => {
            console.log("📡 Tín hiệu Real-time:", payload);
            const { action, deviceUniqueId, data } = payload;

            // Kịch bản cho User thường: Tự động gọi lại API ngầm để DB phân quyền lọc lại
            if (String(userID) !== "1") {
                fetchDevices();
                return;
            }

            // Kịch bản cho Admin: Cập nhật trực tiếp trên State để giao diện mượt mà nhất
            if (action === 'CREATE') {
                setDevices((prev) => prev.some(d => d.deviceUniqueId === data.deviceUniqueId) ? prev : [data, ...prev]);
            } else if (action === 'UPDATE') {
                setDevices((prev) => prev.map(d => d.deviceUniqueId === deviceUniqueId ? data : d));
            }
        });

        // 3. Dọn dẹp cổng nghe (Cleanup) khi người dùng chuyển trang để chống tràn RAM
        return () => {
            socket.off('DEVICE_CHANGED');
        };

    }, [userID]); // Tự động chạy lại luồng nếu userID trong localStorage có sự biến động thay đổi

    return { devices, loading };
}


export function useErrorData(userID: string | null){
    const [errorList, setErrorList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Gọi API lấy dữ liệu lỗi khi load trang
    useEffect(() => {
        if (!userID) return;

        const fetchBugs = async () => {
            try {
                const t = new Date().getTime();
                const response = await axios.get(`http://localhost:5000/api/logEntry/getLogEntryError/${userID}?t=${t}`);
                if (response.data.success) {
                    setErrorList(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBugs();

        const handleLogChange = (payload: any) => {
            console.log("📡 Tín hiệu Real-time:", payload);
            const {data } = payload;

            // Nếu là Dev thường và lỗi này không gán cho mình thì bỏ qua
            if (String(userID) !== "1" && String(data.userId) !== String(userID)) {
                return;
            }
            
            setErrorList((prev) => prev.some(log => log.logEntryId === data.logEntryId) ? prev : [data, ...prev]);
        };

        // 2. 🔥 LẮNG NGHE REAL-TIME ĐỒNG BỘ
        socket.on('LOGENTRY_CHANGED', handleLogChange);

        // Cleanup lắng nghe để tránh trùng lặp sự kiện khi unmount Component
        return () => {
            socket.off('LOGENTRY_CHANGED', handleLogChange);
        };
    }, [userID]);
    return {errorList,loading}
}