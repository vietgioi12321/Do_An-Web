import React from 'react';
import { useAssignData } from '../../services/actionService';
import TableTabStyle from "../../../assets/style/TableTabStyle";

function Assign() {
    const {bugs,loading} = useAssignData();

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
                        <th style={TableTabStyle.thead_th}>ID</th>
                        <th style={TableTabStyle.thead_th}>Tiêu Đề</th>
                        <th style={TableTabStyle.thead_th}>Tên thiết bị</th>
                        <th style={TableTabStyle.thead_th}>Phiên bản</th>
                        <th style={TableTabStyle.thead_th}>Developer được gán</th>
                        <th style={TableTabStyle.thead_th}>Trạng Thái</th>
                        <th style={TableTabStyle.thead_th}>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bugs.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={TableTabStyle.tbody_td}>
                                Không có dữ liệu lỗi nào được trả về từ API.
                            </td>
                        </tr>
                    ) : (
                        // 3. Duyệt mảng để in danh sách chính xác theo API trả về
                        bugs.map((bug) => (
                            <tr key={bug.logEntryId} style={{ borderBottom: '1px solid #ddd' }}>
                                {/* Cột 1: ID (logEntryId) */}
                                <td style={TableTabStyle.tbody_td}>
                                    {bug.logEntryId}
                                </td>
                                
                                {/* Cột 2: Tiêu Đề (name + thông điệp lỗi ngắn gọn) */}
                                <td style={TableTabStyle.tbody_td}>
                                    <div style={{ fontWeight: 'bold', color: '#ef4444' }}>{bug.name}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {bug.errorMessage}
                                    </div>
                                </td>
                                
                                {/* Cột 3: Tên thiết bị (deviceName) */}
                                <td style={TableTabStyle.tbody_td}>
                                    {bug.deviceName}
                                </td>
                                
                                {/* Cột 4: Phiên bản */}
                                <td style={TableTabStyle.tbody_td}>
                                    {bug.osVersion}
                                </td>

                                <td style={TableTabStyle.tbody_td}>
                                    {bug.developerName}
                                </td>
                                
                                {/* Cột 5: Trạng Thái */}
                                <td style={TableTabStyle.tbody_td}>
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
                                
                                {/* Cột 6: Hành Động */}
                                <td style={TableTabStyle.tbody_td}>
                                    <span style={{color: bug.userId === 1 ? '#eab308' : '#10b981'}}>
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