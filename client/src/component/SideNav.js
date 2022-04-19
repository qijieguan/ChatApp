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
            axios.post('/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); });
            setUser(JSON.parse(sessionStorage.getItem('user'))); 
        }
    }, [dispatch]);

    const handleClick = (event) => {
        let elements = document.querySelectorAll('.side-li:not(.logout)');
        elements.forEach(el => { el.classList.remove('active') });
        event.currentTarget.classList.add('active');
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    return (
        <div className="side-panel flex" style={{display: sessionStorage.getItem('isLogged') ? 'inline-flex' : 'none'}}>
            <div className="side-logo flex">
                <AiOutlineWechat className="logo-icon" style={{marginLeft: '5px'}} color="rgb(55, 243, 243)" size={36}/>
            </div>
            <Link to='/Dashboard' className="side-li flex" id="/Dashboard" onClick={handleClick}>
                <h1>Dashboard</h1>
                <AiFillHome className="side-icon"/>
            </Link>
            <Link to='/Friend' className="side-li flex" id="/Friend" onClick={handleClick}>
                <h1>Friends</h1>
                <FaUserFriends className="side-icon"/>
            </Link>
            <Link to="/Search" className="side-li flex" id="/Search" onClick={handleClick}>
                <h1>Search</h1>
                <BsSearch className="side-icon"/>
            </Link>
            <Link to="/About" className="side-li flex" id="/About" onClick={handleClick}>
                <h1>Miscellaneous</h1>
                <AiFillRead className="side-icon"/>
            </Link>
            <div className="side-li flex logout" onClick={logout}>
                <h1>Log Out</h1>
                <BiLogIn size={30}/>
            </div>
            <div className="side-user flex">
                <img src={user.image_url} alt=""/>
                <h1>{user.firstname} {user.lastname}</h1>
            </div>       
        </div>
    );
}

export default SideNav;