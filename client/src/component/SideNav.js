import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Side = () => {
    return (
        <div id="side-panel" style={{display: localStorage.getItem('isLogged') ? 'block' : 'none'}}>
            <Link to='/Dashboard' className="side-li" style={{borderRadius: '5px 0 0 0'}}>
                <AiFillHome className="side-icon" color="white"/>
                <div style={{color: 'white'}}>Home</div>
            </Link>
            <div className="side-li">
                <FaUserFriends className="side-icon" color="white"/>
                <div style={{color: 'white'}}>Friends</div>
            </div>
            <Link to="/Search" className="side-li" style={{borderRadius: '0 0 0 5px'}}>
                <BsFillPersonPlusFill className="side-icon" color="white"/>
                <div style={{color: 'white'}}>Search</div>
            </Link>
        </div>
    );
}

export default Side;