import React from 'react';
import { useDeviceData } from '../../services/systemService.ts';
import TableTabStyle from "../../../assets/style/TableTabStyle";

function Device() {
    const {devices,loading} = useDeviceData();
    // Hiển thị màn hình chờ khi đang lấy dữ liệu
    if (loading) {
        return <div style={{ margin: 20, color: "var(--text-main)" }}>Đang tải danh sách thiết bị...</div>;
    }

    return (
        <div className="Device" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginLeft: 10, marginBlock: '10px', color: "var(--text-main)" }}>Device</h3>
            <h4 style={{ marginLeft: 20, marginBlock: '10px', color: "var(--text-main)" }}>Danh sách thiết bị</h4>

            <table 
                className="listDevice" 
                style={{ 
                    borderCollapse: 'collapse', 
                    marginInline: 20,
                    color: "var(--text-main)" // Đồng bộ với màu theme hệ thống của bạn
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
                        <th style={TableTabStyle.thead_th}>ID</th>
                        <th style={TableTabStyle.thead_th}>Tên Thiết bị</th>
                        <th style={TableTabStyle.thead_th}>Phiên Bản</th>
                        <th style={TableTabStyle.thead_th}>Số lõi CPU</th>
                        <th style={TableTabStyle.thead_th}>Pin</th>
                        <th style={TableTabStyle.thead_th}>Tốc độ mạng</th>
                        <th style={TableTabStyle.thead_th}>Tổng số App</th>
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
                        // 3. Vòng lặp .map() duyệt qua danh sách thiết bị để in ra màn hình
                        devices.map((device, index) => (
                            <tr key={device.deviceId || index} style={{ border: '1px solid #ddd' }}>
                                {/* Tự động sinh ID hiển thị tăng dần hoặc dùng trường có sẵn như device.deviceId */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    {device.deviceId}
                                </td>
                                
                                {/* Tên thiết bị (Ví dụ: Google Pixel 6 (Emulator)) */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    {device.name}
                                </td>
                                
                                {/* Phiên bản hệ điều hành (Ví dụ: Android 14) */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    {device.osVersion}
                                </td>
                                
                                {/* Số lõi CPU (Ví dụ: 4 Cores) */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    {device.cpuCores}
                                </td>
                                
                                {/* Mức pin (Ví dụ: 100%) */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    <span style={{
                                        color: device.batteryLevel === '100%' ? '#10b981' : 'inherit',
                                        fontWeight: device.batteryLevel === '100%' ? 'bold' : 'normal'
                                    }}>
                                        {device.batteryLevel}
                                    </span>
                                </td>
                                
                                {/* Tốc độ mạng (Ví dụ: 150 Mbps) */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    {device.networkSpeeds} Mbps
                                </td>
                                
                                {/* Tổng số App cài đặt (Ví dụ: 42) */}
                                <td style={{...TableTabStyle.tbody_td,textAlign:'center'}}>
                                    {device.totalApps}
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