import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/AssignStyle.css';

function Assign() {
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

    if (loading) {
        return <div style={{ margin: 20, color: 'var(--text-main)' }}>Đang tải danh sách lỗi...</div>;
    }

    return (
        <div className="Assign" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginLeft: 10, marginBlock: '10px', color: 'var(--text-main)' }}>Assign</h3>
            <h4 style={{ marginLeft: 20, marginBlock: '10px', color: 'var(--text-main)' }}>Danh sách gán lỗi - Developer</h4>

            <table 
                className="listError" 
                style={{ 
                    borderCollapse: 'collapse', 
                    marginInline: 20,
                    color: 'var(--text-main)' // Đảm bảo hiển thị tốt trên nền tối
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Tiêu Đề</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Tên thiết bị</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Phiên bản</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Developer được gán</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Trạng Thái</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bugs.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ border: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>
                                Không có dữ liệu lỗi nào được trả về từ API.
                            </td>
                        </tr>
                    ) : (
                        // 3. Duyệt mảng để in danh sách chính xác theo API trả về
                        bugs.map((bug) => (
                            <tr key={bug.logEntryId} style={{ borderBottom: '1px solid #ddd' }}>
                                {/* Cột 1: ID (logEntryId) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {bug.logEntryId}
                                </td>
                                
                                {/* Cột 2: Tiêu Đề (name + thông điệp lỗi ngắn gọn) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#ef4444' }}>{bug.name}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {bug.errorMessage}
                                    </div>
                                </td>
                                
                                {/* Cột 3: Tên thiết bị (deviceName) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {bug.deviceName}
                                </td>
                                
                                {/* Cột 4: Phiên bản (Trích xuất từ trường deviceName hoặc để trống tùy thuộc vào dữ liệu hệ điều hành) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', color: '#94a3b8' }}>
                                    {/* Vì API trả về chuỗi "Thiết bị không xác định (104)", nếu có phiên bản hệ điều hành riêng bạn hãy thay bằng trường đó */}
                                    {bug.osVersion}
                                </td>

                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', color: '#94a3b8' }}>
                                    {bug.developerName}
                                </td>
                                
                                {/* Cột 5: Trạng Thái */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    <span style={{ 
                                        padding: '2px 6px', 
                                        borderRadius: '4px', 
                                        fontSize: '11px', 
                                        fontWeight: 'bold',
                                        backgroundColor: bug.logLevel === 'ERROR' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                                        color: bug.logLevel === 'ERROR' ? '#ef4444' : '#f59e0b'
                                    }}>
                                        {bug.assignStatus}
                                    </span>
                                </td>
                                
                                {/* Cột 6: Hành Động (In ra chuỗi assignStatus: "Đã gán" hoặc "Chưa gán cho Developer") */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: '500' }}>
                                    <span style={{
                                        color: bug.userId === 1 ? '#eab308' : '#10b981'
                                    }}>
                                        {bug.action}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Assign;