import './styles/nav.css';
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

const SideNav = () => {

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
        let elements = document.querySelectorAll('.side-li:not(.logout)');
        elements.forEach(el => { el.classList.remove('active') });
        event.currentTarget.classList.add('active');
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    return (
        <div className="side-panel flex" style={{display: sessionStorage.getItem('isLogged') ? '' : 'none'}}>
            <div className="side-logo flex">
                <AiOutlineWechat className="logo-icon" style={{marginLeft: '5px'}} color="gold" size={36}/>
            </div>
            <Link to='/Chatpage' className="side-li flex" id="/Chatpage" onClick={handleClick}>
                <BsFillChatSquareTextFill className="side-icon"/>
                <div style={{marginLeft: '0.375rem'}}>CHAT</div>
            </Link>
            <Link to='/Friend' className="side-li flex" id="/Friend" onClick={handleClick}>
                <div>CONNECTIONS</div>
                <FaUserFriends className="side-icon"/>
            </Link>
            <Link to="/Search" className="side-li flex" id="/Search" onClick={handleClick}>
                <div>PEOPLE</div>
                <BsSearch className="side-icon"/>
            </Link>
            <div className="side-li flex logout" onClick={logout}>
                <div>LOG OUT</div>
                <BiLogIn size={30}/>
            </div>    
            <div className="side-user flex">
                <img src={user.image_url} alt=""/>
                <div>{user.firstname} {user.lastname}</div>
                <BsThreeDotsVertical size={30} color="white" style={{marginLeft: '0.25vw'}}/>
                <Link to='/Profile' className='drop-li flex'>
                    <BsFilePersonFill className='person-icon'/>
                    <div>Profile Info</div>
                </Link>
            </div> 
    </div>
    );
}

export default SideNav;