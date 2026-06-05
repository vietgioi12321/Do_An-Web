// AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AdminRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        
        // Kiểm tra xem số role trong Token có nằm trong mảng allowedRoles cho phép không
        if (allowedRoles.includes(Number(decoded.role))) {
            return <Outlet />; // 🌟 Cực kỳ quan trọng: Outlet sẽ đại diện cho <Dashboard /> hoặc <AIChatbotDashboard /> được hiển thị
        } else {
            return <div style={{color: 'red', padding: '20px', fontWeight: 'bold'}}>⚠️ Lỗi: Bạn không có quyền truy cập vào trang quản trị này!</div>;
        }
    } catch (error) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }
};