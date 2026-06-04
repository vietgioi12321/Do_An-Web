import React from 'react';
import { useState } from 'react';
import Overview from './OverviewTab';
import Menu from './MenuView';
import Assign from './AssignTab'
import Activity from './ActivityTab';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('assign');
  const tabs = ['overview', 'devices', 'patching', 'software', 'Error', 'activities','assign'];

  // Hàm render nội dung tương ứng
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview/>;
      case 'danh sách lỗi':
        return <BugListComponent />;
      case 'assign':
        return <Assign />; 
      case 'activities':
        return <Activity/>
      default:
        return null;
    }
  };

  return (
    <div class="dashboard" style={{display:'flex', flexDirection: 'row',width:'100vw',height:'100vh',overflowWrap:'break-word'}}>
        
        <div class="dashboard__menu" style={{backgroundColor: '#00253A', width: '15%'}}>
          <Menu></Menu>
        </div>
        <div class="dashboardView" style={{width: '85%'}}>
          <div class="dashboardView__search" style={{backgroundColor:'#D9D9D9',display:'flex', alignItems:'center', marginRight:30}}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type='search' placeholder="Search" style={{height:30,flex:1, marginRight:20}} />
            <img src="/assets/icons/User.png" alt="User" style={{ width: 30, height: 30 }}></img>
          </div> 
          <nav class="page">
            <ol style={{display:'flex', listStyle:'none',marginBottom:'6px',paddingLeft:'20px'}}>
              <li style={{}}><a href='trangchu'>Home</a></li>
              <span style={{margin:'0 6px'}}> &gt; </span>
              <li><a href='oke' style={{textDecoration:'none', color:'inherit'}}>Activity</a></li>
            </ol>
          </nav>

          <div class="dashboardName" style={{marginLeft:'30px', gap: '6px',display:'flex',alignItems:'flex-end'}}>
            <i class="fa-regular fa-clock"></i>
            <span>Dashboard</span>
          </div>

          <div class="page-function" style={{ display: 'flex', gap: '30px' }}>
            {tabs.map(tab => (
              <button
                onClick={() => setActiveTab(tab)}
                style={{
                  color: activeTab === tab ? '#3C8DC2' : 'black',
                  background: 'none',
                  border: 'none'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <hr/>

          <div class="tab-content">
            {renderContent()}
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
