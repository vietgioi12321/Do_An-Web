import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../assets/icons/icons';

function Header(){

    const [userRole, setUserRole] = useState('null');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const saveUserRole = localStorage.getItem('userRole');
        setUserRole(saveUserRole)

        // Lắng nghe sự kiện click ra ngoài để đóng menu
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[])

    const handleLogout = () => {
        // Xóa toàn bộ dữ liệu phiên đăng nhập
        localStorage.clear();
        // Điều hướng về trang Login
        navigate('/login');
    }

    return(
        <div className="dashboardView__search" style={{display:'flex', alignItems:'center', marginRight:30}}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type='search' placeholder="Search" style={{height:30,flex:1, marginRight:20}} />
            
            <div ref={dropdownRef} style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Hiển thị tên tài khoản ở đây để dễ nhận biết */}
                <span style={{fontWeight: 'bold', fontSize: 16, color: '#374151'}}>
                    {localStorage.getItem('userAccount') || 'User'}
                </span>
                
                <img 
                    src={userRole == '1' ? Icons.iconAdmin : Icons.iconDev} 
                    alt="User" 
                    style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                    onClick={() => setShowDropdown(!showDropdown)}
                ></img>

                {/* Dropdown Đăng xuất / Đổi mật khẩu */}
                {showDropdown && (
                    <div style={{
                        position: 'absolute',
                        top: 60,
                        right: 0,
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: 8,
                        overflow: 'hidden',
                        zIndex: 1000,
                        minWidth: 170
                    }}>
                        <button 
                            onClick={() => navigate('/changePassword')}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #f3f4f6',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: 16,
                                color: '#374151',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontWeight: 'bold'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <i className="fa-solid fa-key"></i>
                            Đổi mật khẩu
                        </button>
                        <button 
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: 16,
                                color: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontWeight: 'bold'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <i className="fa-solid fa-right-from-bracket"></i>
                            Đăng xuất
                        </button>
                    </div>
                )}
            </div>
          </div>
    )
}

export default Header