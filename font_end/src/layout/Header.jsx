import React, {useState,useEffect} from 'react';
import Icons from '../../assets/icons/icons';

function Header(){

    const [userRole, setUserRole] = useState('null')

    useEffect(() => {
        const saveUserRole = localStorage.getItem('userRole');
        setUserRole(saveUserRole)
    },[])

    return(
        <div className="dashboardView__search" style={{display:'flex', alignItems:'center', marginRight:30}}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type='search' placeholder="Search" style={{height:30,flex:1, marginRight:20}} />
            <img src={userRole == '1' ? Icons.iconAdmin : Icons.iconDev} alt="User" style={{ width: 100, height: 100 }}></img>
          </div>
    )
}

export default Header