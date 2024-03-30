import './styles/dashboard.css';
import Menu from './Menu.js';
import SideNav from './SideNav.js';
import PostSection from './PostSection.js';
import CommentSection from './CommentPage.js';
import ChatPage from './ChatPage.js';
import Community from './Community.js';
import CommunityPage from './CommunityPage.js';

import Friend from './Friend.js';
import Search from './Search.js';
import Profile from './Profile.js';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => { 

    const location = useLocation();

    const [pathname, setPathname] = useState(null);

    useEffect(() => {
        let pathname = location.pathname.includes('Dashboard') ? '/Dashboard' : location.pathname;
        let element = document.getElementById(pathname);
    
        document.getElementsByClassName('active')[0]?.classList.remove('active');
        element?.classList.add('active'); 
        
        setPathname(location.pathname);

        document.querySelector('.highlight')?.classList.remove('highlight');
        let param = '';
        if (location.pathname.includes('Post')) { param = 'post' }
        else if (location.pathname.includes('Community')) { param = 'community' }

        setTimeout(() => {
            document.getElementsByClassName(param + '-nav')[0]?.classList.add('highlight');
        });
    }, [location]);

    return ( 
        <div className="dashboard grid">
            <Menu/>
            <SideNav mode={"static"}/>
            <SideNav mode={"dynamic"}/>
            <div className='dashboard-overlay'/>
            <div>
                {pathname === '/Dashboard/Post' &&
                    <PostSection/>
                }

                {pathname && pathname.includes('/Comment') &&
                    <CommentSection/>
                }

                {pathname === '/Dashboard/Chat' &&
                    <ChatPage/>
                }

                {pathname === '/Dashboard/Community' &&
                    <Community/>
                }

                {pathname && pathname.includes('/Dashboard/Community/') &&
                    <CommunityPage/>
                }

                {pathname === '/Friend' &&
                    <Friend/>
                }

                {pathname === '/Search' &&
                    <Search/>
                }

                {pathname === '/Profile' &&
                    <Profile/>
                }

            </div>
        </div> 
    ); };

export default Dashboard;