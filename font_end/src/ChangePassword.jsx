import React from "react";

function ChangePassword(){
    return(
        <div className="changePassword" style={{display:'flex', flexDirection: 'column',width:'100vw',height:'100vh'}}>
            <div className="header_changePassword" style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <img src="/assets/icons/backPage.png" alt="backPage" style={{ width: 24, height: 24 }}></img>
                <img src="/assets/icons/User.png" alt="User" style={{ width: 30, height: 30 }}></img>
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
                <form style={{display:'flex', flexDirection:'column', height: 'fit-content', alignItems:'end', gap:10}}>
                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Tài khoản</span>
                        <input style={{width:200, height:30}}/>
                    </div>
                    
                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Mật khẩu cũ</span>
                        <input style={{width:200, height:30}}/>
                    </div>

                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Mật khẩu mới</span>
                        <input style={{width:200, height:30}}/>
                    </div>

                    <div style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Nhập lại mật khẩu mới</span>
                        <input style={{width:200, height:30}}/>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default ChangePassword