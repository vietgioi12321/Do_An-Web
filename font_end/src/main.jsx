import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login'
import Dashboard from './Dashboard'
import RecoverPassword from './RecoverPassword'
import ChangePassword from './ChangePassword'
import AIChatbotDashboard from './AIChatbotDashboard'
import Test from './test'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AIChatbotDashboard/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recoverPassword" element={<RecoverPassword />} />
            <Route path="/changePassword" element={<ChangePassword/>}/>
        </Routes>
        
    </BrowserRouter>
    
)