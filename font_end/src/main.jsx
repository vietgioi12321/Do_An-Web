import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login'
import Dashboard from './Dashboard'
import RecoverPassword from './RecoverPassword'
import ChangePassword from './ChangePassword'
import AIChatbotDashboard from './AIChatbotDashboard'
import { AdminRoute } from './AdminRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style/css/fontColors.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login />} />
            
            <Route element={<AdminRoute allowedRoles={[1]} />}>
                {/* Tất cả các Route nằm bên trong cặp thẻ này đều được bảo vệ nghiêm ngặt */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/ai-chatbot" element={<AIChatbotDashboard />} /> 
                {/* Đã xóa bỏ route /dashboard bị hở bên ngoài */}
            </Route>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recoverPassword" element={<RecoverPassword />} />
            <Route path="/changePassword" element={<ChangePassword/>}/>
        </Routes>
        
    </BrowserRouter>
    
)