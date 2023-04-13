import './styles/menu.css';
import { AiOutlineWechat, AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { BsFilePersonFill, BsFillChatSquareTextFill, } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFriends } from './actions/index.js';
import axios from 'axios';

const Menu = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem("isLogged")) {
            axios.post(baseURL +'/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); }); 
        }
    }, [dispatch, baseURL]);

    const handleClick = (event) => {
        document.querySelector('.menu-li.active:not(.logout)');
    
        event.currentTarget.classList.add('active');
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    return (
        <div className="menu-bar flex" style={{display: sessionStorage.getItem('isLogged') ? '' : 'none'}}>
            <div className="menu-logo flex">
                <AiOutlineWechat className="logo-icon" color="gold" size={36}/>
            </div>
            <Link to='/Dashboard/Post' className="menu-li flex" id="/Dashboard" onClick={handleClick}>
                <AiFillHome className="menu-li-icon"/>
                <div>Dashboard</div>
            </Link>
            <Link to='/Friend' className="menu-li flex" id="/Friend" onClick={handleClick}>
                <FaUserFriends className="menu-li-icon"/>
                <div>Following</div>
            </Link>
            <Link to="/Search" className="menu-li flex" id="/Search" onClick={handleClick}>
                <BsSearch className="menu-li-icon"/>
                <div>Find Users</div>
            </Link>
              
            <div className="menu-dropdown flex">
                <img src={user.profile_url} alt=""/>
                <div className='menu-user'>{user.firstname} {user.lastname}</div>
                <MdArrowDropDown size={30} color="white" style={{marginLeft: '0.25vw'}}/>
                <div className='menu-links flex'>
                    <Link to='/Profile' className='menu-link flex'>
                        <div>PROFILE</div>
                        <BsFilePersonFill className='person-icon'/>
                    </Link>
                    <a className="menu-link flex" onClick={logout}>
                        <div>LOG OUT</div>
                        <BiLogIn className='logout-icon'/>
                    </a>
                </div>
            </div> 
        </div>
    );
}

export default Menu;