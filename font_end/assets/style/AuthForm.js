const AuthFormStyle = {
    authForm: {
        width:'100vw',height:'100vh', 
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        gap:'20px',
        background:'#D0EEFF'
    },

    logo:{
        width:'100px',
        height:'100px'
    },

    form: {
        display:'flex',
        gap:20,
        flexDirection:'column'
    },

    input: {
        display:'flex',
        flexDirection:'column',
        gap:10,
        alignItems:'end'
    },

    inpuField: {
        marginLeft:10,
        height:40,
        width:250
    },
    button:{
        background:'#D9D9D9',
        border:'none',
        padding:10
    }
}

export const ChangePasswordStyle = {
    change_password: {
        display:'flex',
        flexDirection: 'column',
        width:'100vw',
        height:'100vh'
    },

    header_changePassword:{
        display:'flex',
        width:'97%',
        justifyContent:'space-between'
    },

    form_changePassword:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexGrow:1
    },

    background_logo :{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url('/assets/icons/ICTU_logo.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: '400px 400px',
        opacity: 0.1,
        zIndex: -1
    }
}

export default AuthFormStyle