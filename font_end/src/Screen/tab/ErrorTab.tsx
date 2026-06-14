import React from 'react';
import { useErrorData } from '../../services/systemService';

export default function Error() {
    const {errorList,loading} = useErrorData(localStorage.getItem('userId'));

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
                    Tổng số lỗi: {errorList.length}
                </span>
            </div>

            {/* Danh sách các khối Card lỗi */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {errorList.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#64748b', padding: '40px', border: '1px dashed #334155', borderRadius: '8px' }}>
                        Hệ thống an toàn, chưa phát hiện log lỗi nào!
                    </div>
                ) : (
                    errorList && errorList.map((item) => {
                        // Kiểm tra trạng thái gán để chọn màu Badge
                        const isAssigned = item.userId !== 1; 
                        
                        return (
                            <div 
                                key={item.logEntryId || item._id} 
                                style={{
                                    backgroundColor: '#1e293b',
                                    borderRadius: '8px',
                                    borderLeft: `5px solid ${item.logLevel === 'ERROR' ? '#ef4444' : '#f59e0b'}`,
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
                                            {item.logLevel}
                                        </span>
                                        <h3 style={{ color: '#f1f5f9', margin: 0, fontSize: '16px', fontWeight: '600' }}>
                                            {item.name} <span style={{ color: '#64748b', fontWeight: 'normal' }}>#{item.logEntryId}</span>
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
                                        {isAssigned ? `👤 Đã gán (Dev ID: ${item.userId})` : '⚠️ Chưa gán cho Developer'}
                                    </span>
                                </div>

                                {/* Nội dung thông điệp báo lỗi chi tiết */}
                                <div style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '12px', lineHeight: '1.5' }}>
                                    <strong>Message:</strong> <span style={{ color: '#fca5a5' }}>{item.errorMessage}</span>
                                </div>

                                {/* Khung mã nguồn Stack Trace */}
                                {item.stackTrace && (
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
                                            {item.stackTrace}
                                        </pre>
                                    </div>
                                )}

                                {/* Thanh Footer hiển thị thông tin Thiết bị và Thời gian sự cố */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '10px', marginTop: '5px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
                                    <div key={item._id || item.logEntryId}>
                                        📱 Thiết bị: <strong style={{ color: item.deviceName?.includes('không xác định') ? '#94a3b8' : '#38bdf8' }}>{item.deviceName}</strong> 
                                        <span style={{ marginLeft: '6px' }}>(ID: {item.deviceId})</span>
                                    </div>
                                    <div>
                                        ⏰ Thời gian: <span style={{ color: '#94a3b8' }}>{new Date(item.createdAt).toLocaleString('vi-VN')}</span>
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