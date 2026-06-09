import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/authService';
import AuthFormStyle, {ChangePasswordStyle} from '../../../assets/style/AuthForm';
import Icons from '../../../assets/icons/icons';

function ChangePassword(){

    const [username, setUsername] = useState(`${localStorage.getItem('userAccount') == null ? "" : localStorage.getItem('userAccount')}`);
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [userRole,setUserRole] = useState(`${localStorage.getItem('userRole') == null ? "" : localStorage.getItem('userRole')}`)
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Gửi tài khoản mật khẩu lên server backend của bạn
            const response = await changePassword(username,newPassword,newPassword2);
        
            // 2. CẤP NHẬT SESSION: Lưu token vào localStorage để giữ trạng thái đăng nhập
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.user.role); // Lưu role để tiện check nhanh
            navigate('/dashboard'); 
        } catch (err) {
            console.log(err)
        setError(err.response?.data?.error || 'Đăng nhập thất bại!');
        }
    };



    return(
        <div className="changePassword" style={ChangePasswordStyle.change_password}>
            <div className="header_changePassword" style={ChangePasswordStyle.header_changePassword}>
                <img src="/assets/icons/backPage.png" 
                    alt="backPage" 
                    onClick={() => {navigate(-1)}}
                    style={{ width: 24, height: 24 }}></img>
                <img src={userRole == '1' ? Icons.iconAdmin : Icons.iconDev}
                    alt="User"
                    style={{ width: 100, height: 100 }}/>
            </div>

            <strong style={{marginTop:40}}>Change Password</strong>

            <div className="form-changePassword" style={ChangePasswordStyle.form_changePassword}>
                <div style={ChangePasswordStyle.background_logo}/>

                <form className='form_ChangePassword' onSubmit={handleLogin}
                        style={{display:'flex', flexDirection:'column', height: 'fit-content', alignItems:'end', gap:10}}>
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    
                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Tài khoản</span>
                        <input 
                            value={username}
                            disabled
                            onChange={(e) => {setUsername(e.target.value)}}
                            style={AuthFormStyle.inpuField}/>
                    </div>

                    
                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Mật khẩu mới</span>
                        <input 
                            type="password"
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value)}}
                            style={AuthFormStyle.inpuField}/>
                    </div>

                    
                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Nhập lại mật khẩu mới</span>
                        <input
                            type="password"
                            value={newPassword2}
                            onChange={(e) => {setNewPassword2(e.target.value)}} 
                            style={AuthFormStyle.inpuField}/>
                    </div>

                    <button type='submit' background='#D9D9D9' style={AuthFormStyle.button}>Change</button>
                
                </form>
            </div>
        </div>
    )
}

export default ChangePassword