import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/AssignStyle.css';

interface Device {
    deviceId: number;
    name: string;
    osVersion: string;
    cpuCores: string;
    batteryLevel: string;
    networkSpeeds: number;
    totalApps: number
}

function Device() {
    // 1. Khởi tạo state lưu danh sách thiết bị và trạng thái loading
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);

    // 2. Tự động gọi API lấy danh sách thiết bị khi truy cập màn hình
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Thay đổi domain và port cho đúng cấu hình back-end của bạn (ví dụ: http://localhost:5000)
                const response = await axios.get('http://localhost:5000/api/device/getDevice');
                
                // Giả định dữ liệu trả về nằm trong response.data hoặc response.data.data tùy cấu hình back-end của bạn
                // Ở đây cấu hình nhận mảng thiết bị trực tiếp hoặc từ trường data
                const deviceData = response.data.data || response.data;
                if (Array.isArray(deviceData)) {
                    setDevices(deviceData);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu danh sách thiết bị:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

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
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Tên Thiết bị</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Phiên Bản</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Số lõi CPU</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Pin</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Tốc độ mạng</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px' }}>Tổng số App</th>
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
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {device.deviceId}
                                </td>
                                
                                {/* Tên thiết bị (Ví dụ: Google Pixel 6 (Emulator)) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {device.name}
                                </td>
                                
                                {/* Phiên bản hệ điều hành (Ví dụ: Android 14) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {device.osVersion}
                                </td>
                                
                                {/* Số lõi CPU (Ví dụ: 4 Cores) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {device.cpuCores}
                                </td>
                                
                                {/* Mức pin (Ví dụ: 100%) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    <span style={{
                                        color: device.batteryLevel === '100%' ? '#10b981' : 'inherit',
                                        fontWeight: device.batteryLevel === '100%' ? 'bold' : 'normal'
                                    }}>
                                        {device.batteryLevel}
                                    </span>
                                </td>
                                
                                {/* Tốc độ mạng (Ví dụ: 150 Mbps) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                    {device.networkSpeeds} Mbps
                                </td>
                                
                                {/* Tổng số App cài đặt (Ví dụ: 42) */}
                                <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
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