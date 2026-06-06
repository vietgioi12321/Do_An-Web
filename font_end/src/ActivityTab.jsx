import React, { useState, useEffect } from "react";
import axios from "axios";
import './style/AssignStyle.css';

export default function Activity() {
    // 1. Khởi tạo state để chứa danh sách log (mặc định là mảng rỗng)
    const [activityLogs, setActivityLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Gọi API khi component được mount
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

    if (loading) {
        return <div style={{ margin: 20, color: "var(--text-main)" }}>Đang tải nhật ký hoạt động...</div>;
    }

    return (
        <div className="activityScreen" style={{ marginInline: 20, marginTop: 20 }}>
            <h3 style={{ color: "var(--text-main)", marginBottom: 15 }}>Nhật ký hoạt động hệ thống</h3>
            
            <table 
                className="activityTable" 
                style={{ 
                    borderCollapse: 'collapse', 
                    width: '100%',
                    color: "var(--text-main)" // Đồng bộ màu chữ hệ thống
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
                        <th style={{ border: "1px solid #ddd", padding: "10px", width: "80px" }}>Log ID</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px", width: "120px" }}>Hành động</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Chi tiết hoạt động</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>Thời gian</th>
                    </tr>
                </thead>
                
                <tbody>
                    {/* 3. Duyệt mảng dữ liệu bằng hàm .map() để sinh ra các dòng <tr> tự động */}
                    {activityLogs.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ border: "1px solid #ddd", padding: "15px", textAlign: "center" }}>
                                Chưa có hoạt động nào được ghi nhận.
                            </td>
                        </tr>
                    ) : (
                        activityLogs.map((log) => {
                            // Định dạng lại thời gian ISO từ MongoDB sang định dạng ngày giờ Việt Nam thân thiện
                            const formattedTime = new Date(log.timestamp).toLocaleString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            });

                            return (
                                <tr key={log._id} style={{ borderBottom: "1px solid #ddd" }}>
                                    {/* Hiển thị mã log định danh nội bộ */}
                                    <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                                        {log.activityLogId}
                                    </td>
                                    
                                    {/* Hiển thị loại hành động (được viết hoa để làm nổi bật badge) */}
                                    <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                                        <span style={{
                                            padding: "3px 8px",
                                            borderRadius: "4px",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            backgroundColor: log.actionName.toUpperCase() === "LOGIN" ? "#10b981" : "#3b82f6",
                                            color: "#fff"
                                        }}>
                                            {log.actionName.toUpperCase()}
                                        </span>
                                    </td>
                                    
                                    {/* Hiển thị chuỗi thông tin chi tiết */}
                                    <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>
                                        {log.details}
                                    </td>
                                    
                                    {/* Hiển thị chuỗi ngày giờ đã được format */}
                                    <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center", fontSize: "14px" }}>
                                        {formattedTime}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}