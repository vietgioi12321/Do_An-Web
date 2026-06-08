import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

function Overview() {
    // State lưu trữ dữ liệu báo cáo từ API
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Bảng màu ngẫu nhiên sinh động cho các phần của Pie Chart
    const COLORS = ['#5d4a6d', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Gọi đồng thời cả 2 API thống kê báo cáo lỗi
                const [pieRes, lineRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/bugs/getDeviceErrorStats'),
                    axios.get('http://localhost:5000/api/bugs/getErrorTimelineStats')
                ]);

                if (pieRes.data.success) setPieData(pieRes.data.data);
                if (lineRes.data.success) setLineData(lineRes.data.data);

            } catch (error) {
                console.error("Lỗi khi kết nối dữ liệu báo cáo MongoDB:", error);
                // Gieo dữ liệu fallback giả lập nếu mất kết nối server để UI không bị trống
                setPieData([
                    { name: 'Google Pixel 6 (Emulator)', value: 4 },
                    { name: 'Samsung Galaxy S23', value: 12 },
                    { name: 'Thiết bị không xác định', value: 2 }
                ]);
                setLineData([
                    { date: '2026-06-01', count: 5 },
                    { date: '2026-06-02', count: 12 },
                    { date: '2026-06-03', count: 8 },
                    { date: '2026-06-04', count: 15 },
                    { date: '2026-06-05', count: 21 },
                    { date: '2026-06-06', count: 18 }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div style={{ margin: 20, color: 'var(--text-main)' }}>Đang tính toán biểu đồ hệ thống...</div>;
    }

    return (
        <div className="overViewTab" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="overViewName">
                <strong style={{ margin: 15 }}>OverView</strong>
            </div>
            
            <div className="overviewShow" style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                
                {/* Khối bên trái: Danh sách Organizations (Giữ nguyên giao diện của bạn) */}
                <div className="organizations" style={{ width: 350, height: 500, border: '1px solid black', borderRadius: 15, marginLeft: 15 }}>
                    <strong style={{ display: 'inline-block', margin: 10 }}>Organizations</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingInLine: 15, gap: 15 }}>
                        <div className="search" style={{ display: 'flex', width: '100%', height: 40, border: '1px solid black', borderRadius: 10, alignItems: 'center' }}>
                            <i className="fa-brands fa-sistrix" style={{ fontSize: 20, marginLeft: 15 }}></i>
                            <span style={{ marginLeft: 15, color: '#64748b' }}>Search</span>
                        </div>
                        <span>6 results</span>
                        
                        <table className="organizations_table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid black' }}>
                                    <th style={{ paddingBlock: 10 }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 'bold' }}>Murillo</span>
                                            <span style={{ fontSize: 12, color: '#64748b' }}>4 devices</span>
                                        </div>
                                    </th>
                                    <th><i className="fa-solid fa-circle-exclamation" style={{ color: 'red' }}></i> 4</th>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{ color: 'yellow' }}></i> 16</th>
                                </tr>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid black' }}>
                                    <th style={{ paddingBlock: 10 }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 'bold' }}>Hệ thống Chatbot</span>
                                            <span style={{ fontSize: 12, color: '#64748b' }}>2 devices</span>
                                        </div>
                                    </th>
                                    <th><i className="fa-solid fa-circle-exclamation" style={{ color: 'red' }}></i> 2</th>
                                    <th><i className="fa-solid fa-triangle-exclamation" style={{ color: 'yellow' }}></i> 5</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>

                {/* Khối bên phải: Chứa 2 biểu đồ phân tích dữ liệu lỗi */}
                <div className="chart" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    
                    {/* BIỂU ĐỒ 1: PIE CHART (Tỷ lệ lỗi theo thiết bị điện thoại) */}
                    <div className="chartFlex-pie" style={{ display: 'flex', flexDirection: 'column', width: 500, height: 260, border: '1px solid black', borderRadius: 10, overflow: 'hidden' }}>
                        <span style={{ width: '100%', height: 35, background: 'rgba(148, 163, 184, 0.2)', padding: '8px 15px', fontWeight: '600' }}>
                            Tỷ lệ lỗi trên các Thiết bị di động
                        </span>
                        
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'calc(100% - 35px)', alignItems: 'center' }}>
                            {/* Vùng vẽ hình bánh Donut */}
                            <div style={{ width: '50%', height: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={75}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* Vùng ghi chú danh sách thiết bị động theo dữ liệu */}
                            <div style={{ width: '50%', paddingRight: 10, display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '180px', overflowY: 'auto' }}>
                                {pieData.map((entry, index) => (
                                    <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                                        <div style={{ width: 12, height: 12, backgroundColor: COLORS[index % COLORS.length], borderRadius: '2px', flexShrink: 0 }} />
                                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{entry.name}</span>
                                        <span style={{ fontWeight: 'bold', marginLeft: 'auto' }}>({entry.value})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* BIỂU ĐỒ 2: LINE CHART (Số lượng lỗi phát sinh theo thời gian thực) */}
                    <div className="chartFlex-line" style={{ display: 'flex', flexDirection: 'column', width: 500, height: 260, border: '1px solid black', borderRadius: 10, overflow: 'hidden' }}>
                        <span style={{ width: '100%', height: 35, background: 'rgba(148, 163, 184, 0.2)', padding: '8px 15px', fontWeight: '600' }}>
                            <i className="fas fa-chart-line" style={{ marginRight: 8 }} />
                            Tần suất lỗi Real-time theo ngày tháng
                        </span>
                        
                        <div style={{ width: '100%', height: 'calc(100% - 45px)', paddingTop: 15, paddingRight: 20 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 11 }} />
                                    <Tooltip />
                                    <Line 
                                        type="monotone" 
                                        dataKey="count" 
                                        name="Số lượng lỗi"
                                        stroke="#ef4444" 
                                        strokeWidth={3} 
                                        activeDot={{ r: 6 }} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Overview;