import ChatBox from './ChatBox.js';
import SideNav from './SideNav.js';

const DashBoard = () => { 
    return ( 
        <div className="dashboard flex">
            <SideNav/>
            <ChatBox/>
        </div> 
    ); };

export default DashBoard;