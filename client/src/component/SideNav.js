import './styles/nav.css';
import { AiFillHome, AiFillRead, AiOutlineWechat } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFriends } from './actions/index.js';
import axios from 'axios';

const SideNav = () => {

    const [user, setUser] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem("isLogged")) {
            axios.post('/friends/', { 
                user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            })
            .then((response) => { dispatch(setFriends(response.data)); });
            setUser(JSON.parse(sessionStorage.getItem('user'))); 
        }
    }, [dispatch]);

    const handleClick = (event) => {
        let elements = document.querySelectorAll('.side-li:not(#logout)');
        elements.forEach(el => { el.style.color = 'black'; });
        event.currentTarget.style.color = 'teal';
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    return (
        <div id="side-panel" style={{display: sessionStorage.getItem('isLogged') ? 'inline-flex' : 'none'}}>
            <div id="side-logo">
                <h1>Chat App</h1>
                <AiOutlineWechat id="logo-icon" style={{marginLeft: '5px'}} size={36}/>
            </div>
            <Link to='/Dashboard' className="side-li" id="/Dashboard" onClick={handleClick}>
                <h1>Dashboard</h1>
                <AiFillHome id="side-icon"/>
            </Link>
            <Link to='/Friend' className="side-li" id="/Friend" onClick={handleClick}>
                <h1>Friends</h1>
                <FaUserFriends id="side-icon"/>
            </Link>
            <Link to="/Search" className="side-li" id="/Search" onClick={handleClick}>
                <h1>Search</h1>
                <BsSearch size={22} id="side-icon"/>
            </Link>
            <Link to="/About" className="side-li" id="/About" onClick={handleClick}>
                <h1>Miscellaneous</h1>
                <AiFillRead id="side-icon"/>
            </Link>

            <div className="side-li" id="logout" onClick={logout}>
                <h1>Log Out</h1>
                <BiLogIn size={30}/>
            </div>
            <div id="side-user">
                <img src={user.image_url} alt=""/>
                <h1>{user.firstname} {user.lastname}</h1>
            </div>       
        </div>
    );
}

export default SideNav;