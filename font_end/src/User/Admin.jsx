import React from 'react';
import { useState } from 'react';
import Overview from '../Screen/tab/OverviewTab';
import Device from '../Screen/tab/DeviceTab';
import Error from '../Screen/tab/ErrorTab';
import Assign from '../Screen/tab/AssignTab'
import Activity from '../Screen/tab/ActivityTab';
import Sidebar from '../layout/SidebarUser';

function AdminScreen(){

    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Devices', 'Patching', 'Software', 'Error', 'Activities','Assign'];

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
