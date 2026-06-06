import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword(){

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        // 1. Gửi tài khoản mật khẩu lên server backend của bạn
        const response = await axios.post('http://localhost:5000/api/users/changePassword', {
            username,
            newPassword,
            newPassword2
        });
    
        const { token,success, user } = response.data;
        console.log("token:", token);
        console.log("success:", success);
        console.log("user:", user);
    
        // 2. CẤP NHẬT SESSION: Lưu token vào localStorage để giữ trạng thái đăng nhập
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', user.role); // Lưu role để tiện check nhanh
    
        // 3. XÁC NHẬN QUYỀN ĐỂ ĐIỀU HƯỚNG VÀO TRANG HỢP LÝ
        if (Number(user.role) === 1) {
            // Nếu là sếp Admin -> Đẩy vào trang Dashboard quản lý Bug tổng thể
            navigate('/admin/dashboard'); 
        } else {
            // Nếu là User thường -> Đẩy vào trang xem báo cáo cá nhân hoặc trang chủ
            navigate('/user/home');
        }

        } catch (err) {
            console.log(err)
        // Bắt lỗi nếu sai tài khoản/mật khẩu
        setError(err.response?.data?.error || 'Đăng nhập thất bại!');
        }
    };

    return(
        <div className="changePassword" style={{display:'flex', flexDirection: 'column',width:'100vw',height:'100vh'}}>
            <div className="header_changePassword" style={{display:'flex',width:'97%', justifyContent:'space-between'}}>
                <img src="/assets/icons/backPage.png" alt="backPage" style={{ width: 24, height: 24 }}></img>
                <img src="/assets/icons/icon_Dev.png" alt="User" style={{ width: 100, height: 100 }}></img>
            </div>
            <strong style={{marginTop:40}}>Change Password</strong>
            <div className="form-changePassword" style={{display:'flex', justifyContent:'center', alignItems:'center', flexGrow:1}}>
                <div style={{ position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: `url('/assets/icons/ICTU_logo.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center', 
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '400px 400px',
                            opacity: 0.1,
                            zIndex: -1}}>

                </div>
                <form className='form_ChangePassword' onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', height: 'fit-content', alignItems:'end', gap:10,}}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Tài khoản</span>
                        <input 
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
                            style={{width:200, height:30}}/>
                    </div>

                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Mật khẩu mới</span>
                        <input 
                            type="password"
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value)}}
                            style={{width:200, height:30}}/>
                    </div>

                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Nhập lại mật khẩu mới</span>
                        <input
                            type="password"
                            value={newPassword2}
                            onChange={(e) => {setNewPassword2(e.target.value)}} 
                            style={{width:200, height:30}}/>
                    </div>
                    <button type='submit' background='#D9D9D9' style={{border:'none', padding:10}}>Change</button>
                </form>
            </div>
            
        </div>
    )
}

export default ChangePassword