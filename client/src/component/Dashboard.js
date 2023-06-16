import './styles/dashboard.css';
import Menu from './Menu.js';
import SideNav from './SideNav.js';
import PostSection from './PostSection.js';
import ChatPage from './ChatPage.js';
import Community from './Community.js';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => { 

    const location = useLocation();

    const [pathname, setPathname] = useState(null);

    useEffect(() => {
        setPathname(location.pathname.replace('/Dashboard/', ''));
    }, [location])

    return ( 
        <div>
            <div className="dashboard grid">
                <SideNav/>
                <div>
                    <Menu/>
                    {pathname == 'Post' &&
                        <PostSection/>
                    }

                    {pathname == 'Chat' &&
                        <ChatPage/>
                    }

                    {pathname == 'Community' &&
                        <Community/>
                    }
                </div>
            </div> 
        </div>
    ); };

export default Dashboard;