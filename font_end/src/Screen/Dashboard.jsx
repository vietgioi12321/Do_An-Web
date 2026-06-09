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

    useEffect(()=>{
        const saveUserRole = localStorage.getItem('userRole')
        setUserRole(saveUserRole)
    },[])

  return (
    <div className="dashboard" style={{display:'flex', flexDirection: 'row',width:'100vw',height:'100vh',overflowWrap:'break-word'}}>
        <div className="dashboard__menu" style={{backgroundColor: '#00253A', width: '15%'}}>
          <Menu></Menu>
        </div>
        {userRole == '1' ? 
          (<div className="dashboardView" style={{width: '97%'}}> 
            <Header/>
            <div className='body'><AdminScreen/></div>
          </div>)
          :
          (
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', minHeight: '100vh' }}>
            <div className="dashboardView" style={{width: '80%'}}> 
              <Header/>
              <div className='body'> <DeveloperScreen/> </div>
            </div>
            <div className='ChatBot' style={{display: 'flex',width:'20%',justifyContent: 'flex-end'}}> <ChatBotScreen/> </div>
          </div>)}
    </div>
  );
}

export default Dashboard;
