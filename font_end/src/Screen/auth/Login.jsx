import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/authService';
import Icons from '../../../assets/icons/icons';
import AuthFormStyle from '../../../assets/style/AuthForm';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    /** @param {React.FormEvent} e */
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginService(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId',data.user.userId);
            localStorage.setItem('userRole', data.user.role);
            localStorage.setItem('userAccount', username); // Lưu tên tài khoản để dùng cho đổi mật khẩu
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.error || 'Đăng nhập thất bại!');
        }
    };


    return(
        <div className="login" style={AuthFormStyle.authForm}>
            {/* image logo ICTU */}
            <img src={Icons.ictuLogo} alt='ICTU_icon' style={AuthFormStyle.logo}/>
            
            {/* Form login */}
            <form className='form_login' onSubmit={handleLogin} style={AuthFormStyle.form}>
                {/*  input account ---------------------------------------------------------------------*/}
                <div className='input_Login' style={AuthFormStyle.input}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {/* Input UserName*/}
                    <div className="username" >
                        <strong> Tài khoản </strong>
                        <input  value={username}
                            onChange={(e) => setUsername(e.target.value)} style={AuthFormStyle.inpuField}/>
                    </div>

                    {/* Input password */}
                    <div className="passwork">
                        <strong> Mật khẩu </strong>
                        <input type='password' value={password}
                            onChange={(e) => setPassword(e.target.value)} style={AuthFormStyle.inpuField}/>
                    </div>

                </div>

                {/* Button navigate --------------------------------------------------------*/}
                <div className="button" style={{display: 'flex', justifyContent: 'space-between',}}>
                    <button 
                        type='button'
                        onClick={() => navigate('/RecoverPassword')}
                        style={AuthFormStyle.button} > Revcorver Passwork </button>
                    <button type="submit" style={AuthFormStyle.button}> Login </button>
                </div>
            </form>
        </div>
    )
}

export default Login