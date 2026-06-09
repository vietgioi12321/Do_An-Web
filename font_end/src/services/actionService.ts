import { useState,useEffect } from "react";
import axios from "axios";

export function useActivityData(){
    const [activityLogs, setActivityLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                // Thay đổi URL này cho đúng với cấu hình port back-end của bạn
                const response = await axios.get("http://localhost:5000/api/activitylog/getActivityLog");
                
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
        fetchLogs();
    }, []);
    return {activityLogs,loading}
}

export function useAssignData(){
    // 1. Khởi tạo trạng thái lưu danh sách lỗi lấy từ API
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Tự động gọi API khi giao diện được tải lên
    useEffect(() => {
        const fetchBugs = async () => {
            try {
                // Gọi đến API lấy danh sách log lỗi hệ thống của bạn
                const response = await axios.get('http://localhost:5000/api/assign/getAssign');
                if (response.data.success) {
                    setBugs(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách gán lỗi từ API:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBugs();
        }, []);
    return {bugs,loading}
}

