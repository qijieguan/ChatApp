import './styles/dashboard.css';
import Menu from './Menu.js';
import SideNav from './SideNav.js';
import PostSection from './PostSection.js';
import ChatPage from './ChatPage.js';

const Dashboard = () => { 

    return ( 
        <div>
            <div className="dashboard grid">
                <SideNav/>
                <div>
                    <Menu/>
                    {window.location.href.includes('Post') ?
                        <PostSection/>
                        :
                        <ChatPage/>
                    }
                </div>
            </div> 
        </div>
    ); };

export default Dashboard;