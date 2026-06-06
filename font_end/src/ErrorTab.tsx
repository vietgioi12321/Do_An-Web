import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Error() {
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Gọi API lấy dữ liệu lỗi khi load trang
    useEffect(() => {
        const fetchBugs = async () => {
            try {
                // Thay đổi URL cho khớp với endpoint thực tế của bạn
                const response = await axios.get('http://localhost:5000/api/logEntry/getLogEntryError');
                if (response.data.success) {
                    setError(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBugs();
    }, []);

    if (loading) {
        return <div style={{ margin: 20, color: '#94a3b8' }}>Đang tải danh sách log lỗi hệ thống...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#0f172a', minHeight: '100vh' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ color: '#f8fafc', margin: '0 0 5px 0' }}>Hệ Thống Quản Lý Lỗi Real-time</h2>
                    <p style={{ color: '#64748b', margin: 0 }}>Danh sách nhật ký sự cố báo về từ các thiết bị</p>
                </div>
                <span style={{ backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', border: '1px solid #334155' }}>
                    Tổng số lỗi: {error.length}
                </span>
            </div>

            {/* Danh sách các khối Card lỗi */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {error.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: '40px', border: '1px dashed #334155', borderRadius: '8px' }}>
                        Hệ thống an toàn, chưa phát hiện log lỗi nào!
                    </div>
                ) : (
                    error.map((error) => {
                        // Kiểm tra trạng thái gán để chọn màu Badge
                        const isAssigned = error.userId !== 1; 
                        
                        return (
                            <div 
                                key={error.logEntryId || error._id} 
                                style={{
                                    backgroundColor: '#1e293b',
                                    borderRadius: '8px',
                                    borderLeft: `5px solid ${error.logLevel === 'ERROR' ? '#ef4444' : '#f59e0b'}`,
                                    padding: '16px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #334155',
                                    borderLeftWidth: '5px'
                                }}
                            >
                                {/* Thanh Header của Bug Card */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>
                                            {error.logLevel}
                                        </span>
                                        <h3 style={{ color: '#f1f5f9', margin: 0, fontSize: '16px', fontWeight: '600' }}>
                                            {error.name} <span style={{ color: '#64748b', fontWeight: 'normal' }}>#{error.logEntryId}</span>
                                        </h3>
                                    </div>
                                    
                                    {/* Trạng thái gán Nhân viên xử lý */}
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        backgroundColor: isAssigned ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                                        color: isAssigned ? '#10b981' : '#eab308',
                                        border: `1px solid ${isAssigned ? 'rgba(16, 185, 129, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`
                                    }}>
                                        {isAssigned ? `👤 Đã gán (Dev ID: ${error.userId})` : '⚠️ Chưa gán cho Developer'}
                                    </span>
                                </div>

                                {/* Nội dung thông điệp báo lỗi chi tiết */}
                                <div style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
                                    <strong>Message:</strong> <span style={{ color: '#fca5a5' }}>{error.errorMessage}</span>
                                </div>

                                {/* Khung mã nguồn Stack Trace */}
                                {error.stackTrace && (
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>STACK TRACE:</div>
                                        <pre style={{
                                            margin: 0,
                                            backgroundColor: '#0f172a',
                                            color: '#94a3b8',
                                            padding: '12px',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            fontFamily: 'Consolas, Monaco, monospace',
                                            overflowX: 'auto',
                                            whiteSpace: 'pre-wrap',
                                            border: '1px solid #1e293b'
                                        }}>
                                            {error.stackTrace}
                                        </pre>
                                    </div>
                                )}

                                {/* Thanh Footer hiển thị thông tin Thiết bị và Thời gian sự cố */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '10px', marginTop: '5px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
                                    <div>
                                        📱 Thiết bị: <strong style={{ color: error.deviceName.includes('không xác định') ? '#94a3b8' : '#38bdf8' }}>{error.deviceName}</strong> 
                                        <span style={{ marginLeft: '6px' }}>(ID: {error.deviceId})</span>
                                    </div>
                                    <div>
                                        ⏰ Thời gian: <span style={{ color: '#94a3b8' }}>{new Date(error.createdAt).toLocaleString('vi-VN')}</span>
                                    </div>
                                </div>

                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}