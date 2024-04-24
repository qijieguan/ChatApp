import './styles/menu.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilePersonFill, BsFillChatDotsFill } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';
import { RiMenu2Fill } from 'react-icons/ri';
import { BiLogIn } from 'react-icons/bi';
import { SiMusicbrainz } from "react-icons/si";

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

        closeSearch();
    }, [dispatch, baseURL, location]);

    window.addEventListener('load', () => {
        setTimeout(() => { document.querySelector('.menu')?.scrollIntoView({block: 'start'}); }, 125);
    });

    const handleClick = (event) => {
        document.querySelector('.menu-li.active')?.classList.remove('active');
        event.currentTarget.classList.add('active');
    }

    const handleToggleSearch = () => {
        document.querySelector('.menu-li-wrapper')?.classList.toggle('show');
    }

    const closeSearch = () => { 
        document.querySelector('.menu-li-wrapper')?.classList.remove('show');
    }

    const handleToggleSideNav = () => {
        let side_nav_dynamic = document.querySelector('.side-nav.dynamic');
        if (!side_nav_dynamic?.classList.contains('active')) {
            window.addEventListener('click', (e) => { detectOutsideClick(e); });
        }
        else {
            window.removeEventListener('click', (e) => { detectOutsideClick(e); })
        }
        side_nav_dynamic?.classList.toggle('active');
    }

    const detectOutsideClick = (e) => {
        let side_nav_dynamic = document.querySelector('.side-nav.dynamic');
        if (side_nav_dynamic?.classList.contains('active') && e?.target?.classList?.contains('side-nav')) {
            side_nav_dynamic?.classList.remove('active');
        }
    }

    const logout = () => { 
        sessionStorage.removeItem('user'); 
        sessionStorage.removeItem('isLogged');
    }

    return (
        <div className='menu flex' >
            <div className="menu-bar flex" style={{display: !sessionStorage.getItem('isLogged') && 'none'}}>
                <div className='menu-icon-wrapper'>
                    <RiMenu2Fill className='menu-icon' onClick={() => {handleToggleSideNav()}}/>
                </div>
            
                <label className='menu-logo flex'>
                    VeeChat
                    <SiMusicbrainz className='menu-btn-icon'/>
                </label>

                <div className='menu-li-wrapper flex'>
                    <Link to='/Dashboard/Post' className="menu-li" id="/Dashboard" onClick={(e) => {handleClick(e)}} >
                        <div>Explore</div>
                    </Link>
                    <Link to='/Dashboard/Friend' className="menu-li" id="/Friend" onClick={(e) => {handleClick(e)}}>
                        <div>Mutual Friends</div>
                    </Link>
                    <Link to="/Dashboard/Search" className="menu-li" id="/Search" onClick={(e) => {handleClick(e)}}>
                        <div>Discover People</div>
                    </Link>
                </div>

                <div className='menu-nav-li flex'>  
                    <div className='menu-li-search flex' onClick={() => {handleToggleSearch()}}>
                        <AiOutlineSearch color='rgb(100, 100, 100)'/>
                    </div>

                    <Link to="/Dashboard/Chat">
                        <div className="message-icon flex">
                            <BsFillChatDotsFill/>
                        </div>
                    </Link>
                </div>
                
                <div className="menu-dropdown flex">
                    <div className='menu-user'>{user.firstname} {user.lastname.substring(0, 1)}</div>
                    <img src={user.profile_url} alt=""/>
                    <MdArrowDropDown size={30} color="rgb(107, 107, 107)" className='dropdown-icon' style={{marginLeft: '0.25vw'}}/>
                    <div className='menu-links flex'>
                        <Link 
                            to={'/Dashboard/Profile/' + user.firstname + "_" + user.lastname} className='menu-link flex'>
                            <div>Profile</div>
                            <BsFilePersonFill className='person-icon'/>
                        </Link>
                        <Link to='/' className='menu-link flex logout' onClick={() => {logout()}}>
                            <div>Logout</div>
                            <BiLogIn className='login-icon'/>
                        </Link>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Menu;