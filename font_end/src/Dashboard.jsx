import React from 'react';
import { useState,useEffect } from 'react';

import Menu from './MenuView';
import Header from './layout/Header';

import AdminScreen from './User/Admin';
import DeveloperScreen from './User/Developer';

import ChatBotScreen from './ChatbotScreen';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('assign');
    const [activeChatBot, setActiveChatBot] = useState(0)
    const [userRole, setUserRole] = useState('null');

    useEffect(()=>{
        const saveUserRole = localStorage.getItem('userRole')
        setUserRole(saveUserRole)
        console.log('userRole: '+typeof(userRole))
    },[])

  return (
    <div className="dashboard" style={{display:'flex', flexDirection: 'row',width:'100vw',height:'100vh',overflowWrap:'break-word'}}>
        <div className="dashboard__menu" style={{backgroundColor: '#00253A', width: '15%'}}>
          <Menu></Menu>
        </div>
        <div className="dashboardView" style={{width: '80%'}}>
          <Header/>
          <div className='body'>
            {userRole == '1' ? <AdminScreen/> : <DeveloperScreen/>}
          </div>
        </div>
        <div className='ChatBot'>
          <ChatBotScreen/>
        </div>
    </div>
  );
}

export default Dashboard;
