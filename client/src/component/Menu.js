import './styles/menu.css';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BsFilePersonFill, BsFillChatDotsFill } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { RiMenu2Fill } from 'react-icons/ri';
import { BiCommentMinus } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFriends } from './actions/index.js';
import axios from 'axios';
import SideNav from './SideNav.js';

import { useState } from 'react';

const Menu = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const location = useLocation();

    const dispatch = useDispatch();

    const [ShowMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("isLogged")) {
            axios.post(baseURL +'/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); }); 
        }

        clearDropDowns();
        document.getElementsByClassName('menu-bar')[0]?.scrollIntoView({block: 'start'});

    }, [dispatch, baseURL, location]);

    window.addEventListener('resize', (e) => { handleResize(); });

    const clearDropDowns = () => {
        setShowMenu(false);
        setShowSearch(false);
        document.querySelector('.menu-li-wrapper')?.classList.remove('show');
    }

    const handleResize = () => {
        let menu = document.querySelector('.menu');
        let menubar = document.querySelector('.menu-bar');
        if (menu?.offsetWidth <= 960) {
            menu.style.height = menubar?.offsetHeight + 'px';
            setTimeout(() => {window.scroll({top: 0});});
        }
        else { setTimeout(() => {menu?.scroll({top: 0});}); }

        clearDropDowns();
    }

    const handleClick = (event) => {
        document.querySelector('.menu-li.active')?.classList.remove('active');
        event.currentTarget.classList.add('active');
    }

    const handleOpenSearch = () => {
        document.querySelector('.menu-li-wrapper')?.classList.toggle('show');
        setShowSearch(!showSearch);
        closeMenu();
    }

    const closeMenu = () => { setShowMenu(false); }

    const closeSearch = () => { 
        setShowSearch(false); 
        document.querySelector('.menu-li-wrapper')?.classList.remove('show');
    }

    return (
        <div className='menu'>
            <div className="menu-bar flex" style={{display: !sessionStorage.getItem('isLogged') && 'none'}}>
                <div className='menu-side-nav flex' onClick={() => {setShowMenu(!ShowMenu); closeSearch();}}>
                    <RiMenu2Fill className='menu-icon'/>
                </div>

                { ShowMenu && <SideNav param={'menu'}/> }

                <div className='menu-label'>
                    {window.location.href.includes('Dashboard/Post') &&
                        <div className='menu-label-wrapper flex'>
                            <AiFillHome className="menu-li-icon"/>
                            <span>Home</span>
                        </div>
                    }
                    {window.location.href.includes('Dashboard/Chat') &&
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
                    {window.location.href.includes('Dashboard/Community') &&
                        <div className='menu-label-wrapper flex'>
                            <IoIosPeople className="menu-li-icon community-icon"/>
                            <span>Community</span>
                        </div>
                    }
                    {window.location.href.includes('/Comment') &&
                        <div className='menu-label-wrapper flex'>
                            <BiCommentMinus className='menu-li-icon'/>
                            <span>Comment</span>
                        </div>
                    }
                </div>

                <div className='menu-li-search flex' onClick={handleOpenSearch}>
                    <AiOutlineSearch color='rgb(100, 100, 100)'/>
                </div>

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

                <div>

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
        </div>
    );
}

export default Menu;