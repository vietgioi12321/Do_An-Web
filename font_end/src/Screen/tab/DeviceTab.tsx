import React from 'react';
import { useDeviceData } from '../../services/systemService.ts';
import TableTabStyle from "../../../assets/style/TableTabStyle";

function Device() {
    const {devices,loading} = useDeviceData(localStorage.getItem('userId'));

    return (
        <div className="Device" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginLeft: 10, marginBlock: '10px', color: "var(--text-main)" }}>Device</h3>
        <h4 style={{ marginLeft: 20, marginBlock: '10px', color: "var(--text-main)" }}>Danh sách thiết bị</h4>

        <table 
            className="listDevice" 
            style={{ 
                borderCollapse: 'collapse', 
                marginInline: 20,
                color: "var(--text-main)" 
            }}
        >
            <thead>
                <tr style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
                    <th style={TableTabStyle.thead_th}>ID</th>
                    <th style={TableTabStyle.thead_th}>Tên Thiết bị</th>
                    <th style={TableTabStyle.thead_th}>Phiên Bản</th>
                    <th style={TableTabStyle.thead_th}>Số lõi CPU</th>
                    <th style={TableTabStyle.thead_th}>Cấu hình RAM/ROM</th>
                    <th style={TableTabStyle.thead_th}>Địa chỉ MAC</th>
                    <th style={TableTabStyle.thead_th}>Thời gian cập nhật</th>
                </tr>
            </thead>
            <tbody>
                {devices.length === 0 ? (
                    <tr>
                        <td colSpan={7} style={{ border: '1px solid #ddd', padding: '15px', textAlign: 'center' }}>
                            Không tìm thấy thiết bị nào đang hoạt động.
                        </td>
                    </tr>
                ) : (
                    devices.map((item, index) => (
                        <tr key={item.deviceId || index} style={{ border: '1px solid #ddd' }}>
                            {/* 1. ID tự tăng từ Server */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center'}}>
                                {item.deviceId}
                            </td>
                            
                            {/* 2. Tên thiết bị: Kết hợp Hãng (Brand) + Mã máy (Model) */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center', textTransform: 'capitalize'}}>
                                {`${item.device?.brand || ''} ${item.device?.model || ''}`}
                            </td>
                            
                            {/* 3. Phiên bản hệ điều hành */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center'}}>
                                {item.device?.osVersion || 'N/A'}
                            </td>
                            
                            {/* 4. Số lõi CPU */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center'}}>
                                {item.cpu?.cores ? `${item.cpu.cores} Cores` : 'N/A'}
                            </td>
                            
                            {/* 5. Cấu hình bộ nhớ RAM/ROM */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center'}}>
                                {item.memory ? `${item.memory.ramGB}GB / ${item.memory.romGB}GB` : 'N/A'}
                            </td>
                            
                            {/* 6. Địa chỉ MAC mạng */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center'}}>
                                {item.network?.macAddress || 'N/A'}
                            </td>
                            
                            {/* 7. Ngày giờ cập nhật (Format lại từ chuỗi $date ISO) */}
                            <td style={{...TableTabStyle.tbody_td, textAlign: 'center'}}>
                                {item.updatedAt?.$date 
                                    ? new Date(item.updatedAt.$date).toLocaleString('vi-VN') 
                                    : new Date(item.updatedAt).toLocaleString('vi-VN')
                                }
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
    );
}

export default Device;