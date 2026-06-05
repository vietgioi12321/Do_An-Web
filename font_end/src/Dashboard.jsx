import React from 'react';
import { useState } from 'react';
import Overview from './OverviewTab';
import Menu from './MenuView';
import Assign from './AssignTab'
import Activity from './ActivityTab';
import background from '../assets/icons/background.png';

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
    <div className="dashboard" style={{display:'flex', flexDirection: 'row',width:'100vw',height:'100vh',overflowWrap:'break-word'}}>
        
        <div className="dashboard__menu" style={{backgroundColor: '#00253A', width: '15%'}}>
          <Menu></Menu>
        </div>
        <div className="dashboardView" style={{width: '85%', 
                                          backgroundImage: `url('${background}')`,
                                          backgroundSize: 'cover',
                                          backgroundRepeat: 'no-repeat',
                                          backgroundAttachment: 'fixed',}}>
          <div className="dashboardView__search" style={{display:'flex', alignItems:'center', marginRight:30}}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type='search' placeholder="Search" style={{height:30,flex:1, marginRight:20}} />
            <img src="/assets/icons/icon_Dev.png" alt="User" style={{ width: 100, height: 100 }}></img>
          </div> 
          <nav className="page">
            <ol style={{display:'flex', listStyle:'none',marginBottom:'6px',paddingLeft:'20px'}}>
              <li style={{}}><a href='trangchu'>Home</a></li>
              <span style={{margin:'0 6px'}}> &gt; </span>
              <li><a href='oke' style={{textDecoration:'none', color:'inherit'}}>Activity</a></li>
            </ol>
          </nav>

          <div className="dashboardName" style={{marginLeft:'30px', gap: '6px',display:'flex',alignItems:'flex-end'}}>
            <i className="fa-regular fa-clock"></i>
            <span>Dashboard</span>
          </div>

          <div className="page-function" style={{ display: 'flex', gap: '30px' }}>
            {tabs.map(tab => (
              <button 
                key={tab}
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

          <div className="tab-content">
            {renderContent()}
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
