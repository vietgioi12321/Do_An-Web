import React from "react";
import { useActivityData } from "../../services/actionService";
import TableTabStyle from "../../../assets/style/TableTabStyle";

export default function Activity() {
    const {activityLogs, loading} = useActivityData();

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
                        <th style={{ ...TableTabStyle.thead_th,width:30}}>Log ID</th>
                        <th style={{ ...TableTabStyle.thead_th}}>Hành động</th>
                        <th style={{ ...TableTabStyle.thead_th,width:200}}>Chi tiết hoạt động</th>
                        <th style={{ ...TableTabStyle.thead_th}}>Thời gian</th>
                    </tr>
                </thead>
                
                <tbody>
                    {/* 3. Duyệt mảng dữ liệu bằng hàm .map() để sinh ra các dòng <tr> tự động */}
                    {activityLogs.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={TableTabStyle.tbody_td}>
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
                                    <td style={TableTabStyle.tbody_td}>
                                        {log.activityLogId}
                                    </td>
                                    
                                    {/* Hiển thị loại hành động (được viết hoa để làm nổi bật badge) */}
                                    <td style={TableTabStyle.tbody_td}>
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
                                    <td style={{...TableTabStyle.tbody_td,textAlign:'left'}}>
                                        {log.details}
                                    </td>
                                    
                                    {/* Hiển thị chuỗi ngày giờ đã được format */}
                                    <td style={TableTabStyle.tbody_td}>
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