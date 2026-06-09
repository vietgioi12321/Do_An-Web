import { useState,useEffect } from "react";
import axios from "axios";

export function useDeviceData(){
    // 1. Khởi tạo state lưu danh sách thiết bị và trạng thái loading
    const [devices, setDevices] = useState([] as any[]);
    const [loading, setLoading] = useState(true);

    // 2. Tự động gọi API lấy danh sách thiết bị khi truy cập màn hình
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Thay đổi domain và port cho đúng cấu hình back-end của bạn (ví dụ: http://localhost:5000)
                const response = await axios.get('http://localhost:5000/api/device/getDevice');
                
                // Giả định dữ liệu trả về nằm trong response.data hoặc response.data.data tùy cấu hình back-end của bạn
                // Ở đây cấu hình nhận mảng thiết bị trực tiếp hoặc từ trường data
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

        fetchDevices();
    }, []);
    return {devices,loading}
}


export function useErrorData(){
    const [errorList, setErrorList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Gọi API lấy dữ liệu lỗi khi load trang
    useEffect(() => {
        const fetchBugs = async () => {
            try {
                // Thay đổi URL cho khớp với endpoint thực tế của bạn
                const response = await axios.get('http://localhost:5000/api/logEntry/getLogEntryError');
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
    }, []);
    return {errorList,loading}
}