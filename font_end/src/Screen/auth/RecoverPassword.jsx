import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { recoverPasswordService } from '../../services/authService';
import AuthFormStyle from '../../../assets/style/AuthForm';
import Icons from '../../../assets/icons/icons';

function RecoverPassword(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await recoverPasswordService(username, email);
            console.log("response: ",response)
            if (response.success) {
                localStorage.setItem('token',response.token);
                localStorage.setItem('userRole',response.user.role);
                
                localStorage.setItem('userAccount',response.user.userAccount);

                navigate('/changePassword'); 
            }
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.error || 'Lây lại mật khẩu thất bại!');
        }
    };

    return(
        <div className="recoverPassword" style={AuthFormStyle.authForm}>
            {/* image logo ICTU */}
            <img src={Icons.ictuLogo} alt='ICTU_icon' style={AuthFormStyle.logo}/>
            
            {/* Form RecoverPassword */}
            <form className='form_RecoverPassword'  onSubmit={handleLogin}  style={AuthFormStyle.form}>
                {/*  input account ---------------------------------------------------------------------*/}
                <div className='input_RecoverPassword' style={AuthFormStyle.input}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    {/* Input UserName*/}
                    <div className="username" >
                        <strong>Tài khoản</strong>
                        <input value={username}  style={AuthFormStyle.inpuField}  onChange={(e)=>{setUsername(e.target.value)}}
                            />
                    </div>
                    
                    
                    {/* Input email */}
                    <div className="email">
                        <strong>Email</strong>
                        <input value={email}  style={AuthFormStyle.inpuField}  onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>

                </div>
                
                {/* Button navigate --------------------------------------------------------*/}
                <div className="button" style={{display: 'flex', justifyContent: 'space-between',}}>
                    <button type='button' onClick={() => navigate('/Login')} style={AuthFormStyle.button} >Login</button>
                    <button type="submit" style={AuthFormStyle.button}> Send </button>
                </div>

            </form>
        </div>
    )
}

export default RecoverPassword