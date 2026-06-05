import React, { useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        // 1. Gửi tài khoản mật khẩu lên server backend của bạn
        const response = await axios.post('http://localhost:5000/api/users/login', {
            username,
            password: md5(password)
        });
    
        const { token, user } = response.data;
        console.log("token:", token);
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
        <div className="login" style={{width:'100vw',height:'100vh', 
                            display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column',gap:'20px',
                            background:'#D0EEFF'}}>
            <img src='../assets/icons/ICTU_logo.png' alt='ICTU_icon' style={{width:'100px',height:'100px'}}/>
            <form className='form_login' onSubmit={handleLogin} style={{display:'flex', gap:20, flexDirection:'column'}}>
                <div className='input_RecoverPassword' style={{display:'flex', flexDirection:'column', gap:10, alignItems:'end'}}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="username" >
                        <strong>Tài khoản</strong>
                        <input  value={username}
                                onChange={(e) => setUsername(e.target.value)} // Cập nhật state khi gõ
                                style={{marginLeft:10, height:40, width:250}}/>
                    </div>
                    <div className="passwork">
                        <strong>Mật khẩu</strong>
                        <input  type='password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{marginLeft:10, height:40, width:250}}/>
                    </div>
                </div>
                <div className="button" style={{display: 'flex', justifyContent: 'space-between',}}>
                    <Link to="/RecoverPassword">
                        <button background='#D9D9D9' style={{border:'none', padding:10}} >Revcorver Passwork</button>
                    </Link>
                    
                    {/* <Link to='/dashboard'>
                        <button type='submit' background='#D9D9D9' style={{border:'none', padding:10}}>Login</button>
                    </Link> */}
                    <button type="submit" background='#D9D9D9' style={{border:'none', padding:10}}>Login</button>
                    
                </div>
            </form>
        </div>
    )
}

export default Login