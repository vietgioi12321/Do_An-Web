import React from 'react';
import { useState,useEffect } from 'react';

import Menu from '../layout/MenuView';
import Header from '../layout/Header';

import AdminScreen from '../User/Admin';
import DeveloperScreen from '../User/Developer';

import ChatBotScreen from './ChatBot/ChatbotScreen';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('assign');
    const [activeChatBot, setActiveChatBot] = useState(0)
    const [userRole, setUserRole] = useState('null');

    // State phục vụ việc kéo thả thay đổi kích thước ChatBot
    const [chatBotWidth, setChatBotWidth] = useState(400); // Kích thước mặc định (px)
    const [isResizing, setIsResizing] = useState(false);

    useEffect(()=>{
        const saveUserRole = localStorage.getItem('userRole')
        setUserRole(saveUserRole)
    },[])

    // Lắng nghe sự kiện chuột khi đang kéo dãn
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;
            // Tính toán width mới (từ cạnh phải màn hình trừ đi vị trí chuột)
            let newWidth = window.innerWidth - e.clientX;
            // Giới hạn độ rộng tối thiểu và tối đa
            if (newWidth < 250) newWidth = 250;
            if (newWidth > 800) newWidth = 800;
            setChatBotWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };

  return (
    // Set height 100vh and overflow hidden to prevent body scroll
    <div className="dashboard" style={{display:'flex', flexDirection: 'row', width:'100vw', height:'100vh', overflow:'hidden', overflowWrap:'break-word', userSelect: isResizing ? 'none' : 'auto'}}>
        
        {/* MENU: Fixed height, scrollable if too long */}
        <div className="dashboard__menu" style={{backgroundColor: '#00253A', width: '15%', height: '100vh', overflowY: 'auto'}}>
          <Menu></Menu>
        </div>
        
        {/* Main Content Area: Takes remaining width */}
        <div style={{display:'flex', flexDirection: 'row', width: '85%', height: '100vh'}}>
          
          {userRole == '1' ? 
            (<div className="dashboardView" style={{width: '100%', height: '100%', overflowY: 'auto'}}> 
              <Header/>
              <div className='body'><AdminScreen/></div>
            </div>)
            :
            (
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
              
              {/* Center Content: Scrollable */}
              <div className="dashboardView" style={{width: `calc(100% - ${chatBotWidth}px)`, height: '100%', overflowY: 'auto'}}> 
                <Header/>
                <div className='body'> <DeveloperScreen/> </div>
              </div>
              
              {/* Thanh kéo dãn (Resizer) */}
              <div 
                onMouseDown={handleMouseDown}
                style={{
                  width: '6px', 
                  cursor: 'col-resize', 
                  backgroundColor: isResizing ? '#3b82f6' : '#e5e7eb',
                  transition: 'background-color 0.2s',
                  zIndex: 50
                }} 
                title="Kéo để thay đổi kích thước"
              />

              {/* ChatBot: Fixed on the right */}
              <div className='ChatBot' style={{width: `${chatBotWidth}px`, height: '100%', overflowY: 'hidden'}}> 
                <ChatBotScreen/> 
              </div>
              
            </div>)}
        </div>
    </div>
  );
}

export default Dashboard;
