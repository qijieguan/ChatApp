import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFriends } from './actions/index.js';
import axios from 'axios';

const Side = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem("isLogged")) {
            axios.post('/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); });
        }
    }, [dispatch]);

    const handleClick = (event) => {
        let elements = document.querySelectorAll('#side-li');
        elements.forEach(el => {el.style.background = 'white'; el.style.borderRight = '0'});
        event.target.style.background = 'rgb(230, 230, 230)';
        event.target.style.borderRight = '4px solid blue';
    }

    return (
        <div id="side-panel" style={{display: sessionStorage.getItem('isLogged') ? 'block' : 'none'}}>
            <Link to='/Dashboard' id="side-li" onClick={handleClick} style={{borderRadius: '5px 0 0 0'}}>
                <AiFillHome id="side-icon" color="red"/>
                <div style={{color: 'blue'}}>Home</div>
            </Link>
            <Link to='/Friend' id="side-li" onClick={handleClick}>
                <FaUserFriends id="side-icon" color="orange"/>
                <div style={{color: 'blue'}}>Friends</div>
            </Link>
            <Link to="/Search" id="side-li" onClick={handleClick} style={{borderRadius: '0 0 0 5px'}}>
                <BsFillPersonPlusFill id="side-icon" color="green"/>
                <div style={{color: 'blue'}}>Search</div>
            </Link>
        </div>
    );
}

export default Side;