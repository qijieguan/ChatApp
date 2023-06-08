import './styles/dashboard.css';
import Menu from './Menu.js';
import SideNav from './SideNav.js';
import Post from './Post.js';
import ChatPage from './ChatPage.js';

const Dashboard = () => { 

    return ( 
        <div>
            <div className="dashboard grid">
                <SideNav/>
                <div>
                    <Menu/>
                    {window.location.href.includes('Post') ?
                        <Post/>
                        :
                        <ChatPage/>
                    }
                </div>
            </div> 
        </div>
    ); };

export default Dashboard;