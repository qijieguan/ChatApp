import './styles/menu.css';
import { AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BsFilePersonFill, BsFillChatDotsFill } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFriends } from './actions/index.js';
import axios from 'axios';

const Menu = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem("isLogged")) {
            axios.post(baseURL +'/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); }); 
        }

        let pathname = location.pathname.includes('Dashboard') ? '/Dashboard' : location.pathname;
        let element = document.getElementById(pathname);
            
        element?.classList.add('active'); 
        
    }, [dispatch, baseURL, location]);

    const handleClick = (event) => {
        document.querySelector('.menu-li.active:not(.logout)');
    
        event.currentTarget.classList.add('active');
    }

    return (
        <div className="menu-bar flex" style={{display: sessionStorage.getItem('isLogged') ? '' : 'none'}}>
            <h1 className='menu-label'>
                {window.location.href.includes('Post') &&
                    <div className='menu-label-wrapper flex'>
                        <AiFillHome className="menu-li-icon"/>
                        <span>Home</span>
                    </div>
                }
                {window.location.href.includes('Chat') &&
                    <div className='menu-label-wrapper flex'>
                        <BsFillChatDotsFill className="menu-li-icon"/>
                        <span>Chat</span>
                    </div>
                }
                {window.location.href.includes('Friend') &&
                    <div className='menu-label-wrapper flex'>
                        <FaUserFriends className="menu-li-icon"/>
                        <span>Friends</span>
                    </div>
                }
                {window.location.href.includes('Search') &&
                    <div className='menu-label-wrapper flex'>
                        <BsSearch className="menu-li-icon"/>
                        <span>Discover</span>
                    </div>
                }
                {window.location.href.includes('Profile') &&
                    <div className='menu-label-wrapper flex'>
                        <BsFilePersonFill className="menu-li-icon"/>
                        <span>Profile</span>
                    </div>
                }
                {window.location.href.includes('Community') &&
                    <div className='menu-label-wrapper flex'>
                        <IoIosPeople className="menu-li-icon community-icon"/>
                        <span>Community</span>
                    </div>
                }
            </h1>

            <div className='menu-li-wrapper flex'>
                <Link to='/Dashboard/Post' className="menu-li" id="/Dashboard" onClick={handleClick} >
                    <div>Explore</div>
                </Link>
                <Link to='/Friend' className="menu-li" id="/Friend" onClick={handleClick}>
                    <div>Mutual Friends</div>
                </Link>
                <Link to="/Search" className="menu-li" id="/Search" onClick={handleClick}>
                    <div>Discover People</div>
                </Link>
            </div>

            <Link to="/Dashboard/Chat">
                <div className="message-icon flex">
                    <BsFillChatDotsFill color='rgb(100, 100, 100)'/>
                </div>
            </Link>
              
            <div className="menu-dropdown flex">
                <div className='menu-user'>{user.firstname} {user.lastname.substring(0, 1)}</div>
                <img src={user.profile_url} alt=""/>
                <MdArrowDropDown size={30} color="rgb(107, 107, 107)" className='dropdown-icon' style={{marginLeft: '0.25vw'}}/>
                <div className='menu-links flex'>
                    <Link to='/Profile' className='menu-link flex'>
                        <div>PROFILE</div>
                        <BsFilePersonFill className='person-icon'/>
                    </Link>
                </div>
            </div> 
        </div>
    );
}

export default Menu;