import ChatBox from './ChatBox.js';
import SideNav from './SideNav.js';

const DashBoard = () => { 
    return ( 
        <div id="dashboard">
            <SideNav/>
            <ChatBox/>
        </div> 
    ); };

export default DashBoard;