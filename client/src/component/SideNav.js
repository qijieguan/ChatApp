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
            axios.post('http://localhost:3001/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); });
        }
    }, [dispatch]);

    return (
        <div id="side-panel" style={{display: sessionStorage.getItem('isLogged') ? 'block' : 'none'}}>
            <Link to='/Dashboard' id="side-li" style={{borderRadius: '5px 0 0 0'}}>
                <AiFillHome id="side-icon" color="white"/>
                <div style={{color: 'white'}}>Home</div>
            </Link>
            <Link to='/Friend' id="side-li">
                <FaUserFriends id="side-icon" color="white"/>
                <div style={{color: 'white'}}>Friends</div>
            </Link>
            <Link to="/Search" id="side-li" style={{borderRadius: '0 0 0 5px'}}>
                <BsFillPersonPlusFill id="side-icon" color="white"/>
                <div style={{color: 'white'}}>Search</div>
            </Link>
        </div>
    );
}

export default Side;