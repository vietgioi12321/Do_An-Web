import React from 'react';
import { useState } from 'react';
import Overview from '../OverviewTab';
import Device from '../DeviceTab';
import Error from '../ErrorTab';
import Assign from '../AssignTab'
import Activity from '../ActivityTab';
import Sidebar from './Sidebar';

function DeveloperScreen(){

    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Devices', 'Error', 'Activities','Assign'];

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

export default DeveloperScreen
