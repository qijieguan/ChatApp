import './styles/dashboard.css';
import Menu from './Menu.js';
import SideNav from './SideNav.js';
import Post from './Post.js';
import ChatPage from './ChatPage.js';

const Dashboard = () => { 

    return ( 
        <div>
            <Menu/>
            <div className="dashboard grid">
                <SideNav/>
                {window.location.href.includes('Post') ?
                    <Post/>
                    :
                    <ChatPage/>
                }
            </div> 
        </div>
    ); };

export default Dashboard;