import React from "react";
import './style/AssignStyle.css'

export default function Activity() {
    return (
        // Đã sửa lỗi chính tả ở tên class (screen)
        <div className="activityScreen" style={{ marginInline: 20 }}>
            
            <table 
                className="activityTable" // ✅ Đã sửa chính tả chữ activity
                style={{ 
                    borderCollapse: 'collapse', // ✅ Đã chuyển thuộc tính này vào đúng thẻ <table>
                    width: '100%' // Thêm chiều cao/rộng để bảng giãn đều giao diện
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Id</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Activity</th>
                    </tr>
                </thead>
                
                {/* 🌟 Thêm sẵn tbody để sau này bạn đổ dữ liệu từ AI Chatbot/Bug Monitor vào đây */}
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>1</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>User Admin logged into the dashboard</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>2</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>AI Chatbot resolved a bug monitor request</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}