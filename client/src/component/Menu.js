import './styles/menu.css';
import { AiOutlineWechat } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { BsThreeDotsVertical, BsFilePersonFill, BsFillChatSquareTextFill } from 'react-icons/bs';
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
        let elements = document.querySelectorAll('.menu-li:not(.logout)');
        elements.forEach(el => { el.classList.remove('active') });
        event.currentTarget.classList.add('active');
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    return (
        <div className="menu-bar flex" style={{display: sessionStorage.getItem('isLogged') ? '' : 'none'}}>
            <div className="menu-logo flex">
                <AiOutlineWechat className="logo-icon" style={{marginLeft: '5px'}} color="gold" size={36}/>
            </div>
            <Link to='/Dashboard' className="menu-li flex" id="/Dashboard" onClick={handleClick}>
                <BsFillChatSquareTextFill className="menu-li-icon"/>
                <div style={{marginLeft: '0.375rem'}}>CHAT</div>
            </Link>
            <Link to='/Friend' className="menu-li flex" id="/Friend" onClick={handleClick}>
                <div>CONNECTIONS</div>
                <FaUserFriends className="menu-li-icon"/>
            </Link>
            <Link to="/Search" className="menu-li flex" id="/Search" onClick={handleClick}>
                <div>DISCOVER</div>
                <BsSearch className="menu-li-icon"/>
            </Link>
              
            <div className="menu-dropdown flex">
                <img src={user.image_url} alt=""/>
                <div className='menu-user'>{user.firstname} {user.lastname}</div>
                <BsThreeDotsVertical size={30} color="white" style={{marginLeft: '0.25vw'}}/>
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