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
        setPathname(location.pathname);
    }, [location]);

    return ( 
        <div className="dashboard grid">
            <Menu/>
            <SideNav mode={"static"}/>
            <SideNav mode={"dynamic"}/>
            {pathname &&
                <div>
                    {pathname === '/Dashboard/Post' &&
                        <PostSection/>
                    }

                    {pathname.includes('/Comment') &&
                        <CommentSection/>
                    }

                    {pathname === '/Dashboard/Chat' &&
                        <ChatPage/>
                    }

                    {pathname === '/Dashboard/Community' &&
                        <Community/>
                    }

                    {pathname.includes('/Dashboard/Community/') &&
                        <CommunityPage/>
                    }

                    {pathname === '/Dashboard/Friend' &&
                        <Friend/>
                    }

                    {pathname === '/Dashboard/Search' &&
                        <Search/>
                    }

                    {pathname.includes('/Dashboard/Profile') &&
                        <Profile/>
                    }

                </div>
            }
        </div> 
    ); };

export default Dashboard;