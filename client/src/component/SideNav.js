import { Link } from 'react-router-dom';
import './styles/sidenav.css';

const SideNav = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div className='side-nav'>
            <div className='side-nav-image'>
                <img className='side-nav-bg' src={user.background_url} alt=""/>
                <img className='side-nav-profile' src={user.profile_url} alt=""/>
                <div className='side-nav-name'><span>{user.firstname} </span> <span>{user.lastname}</span> </div>
            </div>
            <div className='side-nav-body flex'>
                <Link to="/Profile">View profile</Link>
                <Link to="/Dashboard/Post">My Posts</Link>
                <Link to="/Dashboard/Chat">My Conversations</Link>
            </div>
        </div>
    )
}

export default SideNav;