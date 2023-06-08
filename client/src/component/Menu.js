import './styles/menu.css';
import { AiFillHome } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BsFilePersonFill } from 'react-icons/bs';
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

    return (
        <div className="menu-bar flex" style={{display: sessionStorage.getItem('isLogged') ? '' : 'none'}}>
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