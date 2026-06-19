import React from 'react';
import { useState } from 'react';
import Overview from '../Screen/tab/OverviewTab';
import Device from '../Screen/tab/DeviceTab';
import Error from '../Screen/tab/ErrorTab';
import Assign from '../Screen/tab/AssignTab'
import Activity from '../Screen/tab/ActivityTab';
import Sidebar from '../layout/SidebarUser';

function AdminScreen(){

    const [activeTab, setActiveTab] = useState(localStorage.getItem('adminActiveTab') || 'Overview');
    const tabs = ['Overview', 'Devices', 'Error', 'Activities','Assign'];

    // Theo dõi và lưu lại Tab mỗi khi người dùng click chuyển trang
    React.useEffect(() => {
        localStorage.setItem('adminActiveTab', activeTab);
    }, [activeTab]);

    // Hàm render nội dung tương ứng
    const renderContent = () => {
        switch (activeTab) {
        case 'Overview':
            return <Overview/>;
        case 'Bugs':
            return <BugListComponent />;
        case 'Devices':
            return <Device/>
        case 'Error':
            return <Error/>
        case 'Assign':
            return <Assign />; 
        case 'Activities':
            return <Activity/>
        default:
            return null;
        }
    };

    return(
        <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onRender={renderContent}></Sidebar>
    )
}

export default AdminScreen
