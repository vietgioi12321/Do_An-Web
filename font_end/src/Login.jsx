import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(username)

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn trang web load lại

        const loginData = {
            username: username,
            password: password
        };

        try {
            // 3. Gửi dữ liệu lên Server (thay URL bằng API của bạn)
            const response = await fetch('https://your-api-url.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert('Đăng nhập thành công!');
                // Lưu token hoặc chuyển hướng trang tại đây
            } else {
                alert('Lỗi: ' + result.message);
            }
        } catch (error) {
            console.error('Lỗi kết nối server:', error);
        }
    };

    return(
        <div className="login" style={{width:'100vw',height:'100vh', 
                            display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column',gap:'20px',
                            background:'#D0EEFF'}}>
            <img src='../assets/icons/ICTU_logo.png' alt='ICTU_icon' style={{width:'100px',height:'100px'}}/>
            <form className='form_login' onSubmit={handleLogin} style={{display:'flex', gap:20, flexDirection:'column'}}>
                <div className='input_RecoverPassword' style={{display:'flex', flexDirection:'column', gap:10, alignItems:'end'}}>
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
                    
                    <Link to='/dashboard'>
                        <button type='submit' background='#D9D9D9' style={{border:'none', padding:10}}>Login</button>
                    </Link>
                    
                </div>
            </form>
        </div>
    )
}

export default Login