import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function RecoverPassword(){
    return(
        <div className="recoverPassword" style={{width:'100vw',height:'100vh', 
                            display:'flex',justifyContent:'center', alignItems:'center',flexDirection:'column',gap:'20px',
                            background:'#D0EEFF'}}>
            <img src='../assets/icons/ICTU_logo.png' alt='ICTU_icon' style={{width:'100px',height:'100px'}}/>
            <form className='form_RecoverPassword' style={{display:'flex', gap:20, flexDirection:'column'}}>
                <div classNameName='input_RecoverPassword' style={{display:'flex', flexDirection:'column', gap:10, alignItems:'end'}}>
                    <div className="username" >
                        <strong>Tài khoản</strong>
                        <input style={{marginLeft:10, height:40, width:250}}/>
                    </div>
                    <div className="email">
                        <strong>Email</strong>
                        <input  style={{marginLeft:10, height:40, width:250}}/>
                    </div>
                </div>
                
                <div className="button" style={{display: 'flex', justifyContent: 'space-between',}}>
                    <Link to={'/'}>
                        <button background='#D9D9D9' style={{border:'none', padding:10}}>Login</button>
                    </Link>
                    
                    <Link to={'/changePassword'}>
                        <button background='#D9D9D9' style={{border:'none', padding:10}}>Send</button>
                    </Link>
                    
                    
                </div>
            </form>
        </div>
    )
}

export default RecoverPassword