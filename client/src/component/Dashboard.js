import ChatBox from './ChatBox.js';
import Menu from './Menu.js';

const Dashboard = () => { 
    return ( 
        <div className="dashboard flex">
            <Menu/>
            <ChatBox/>
        </div> 
    ); };

export default Dashboard;