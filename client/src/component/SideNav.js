import './styles/sidenav.css';
import { BiLogIn } from 'react-icons/bi';

import { Link } from 'react-router-dom';

const SideNav = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    const toggleHighlight = (event) => {
        document.querySelector('.highlight')?.classList.remove('highlight');
        event.target?.classList.add('highlight');

        setTimeout(() => {
            document.querySelector('.post-section')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 500);
    }

    const logout = () => { 
        sessionStorage.removeItem('user'); 
        sessionStorage.removeItem('isLogged');
    }

    return (
        <div className='side-nav'>
            <div className='side-nav-header flex'>
                <img className='side-nav-profile' src={user.profile_url} alt=""/>
                <div className='side-nav-name'>{user.firstname} {user.lastname}</div>
            </div>
            <div className='side-nav-body flex'>
                <Link to="/Profile" onClick={toggleHighlight} className='profile-nav side-nav-link'>See your profile</Link>
                <Link to="/Dashboard/Post" onClick={toggleHighlight} className='post-nav side-nav-link'> Browse all posts</Link>
                <Link to="/Dashboard/Chat" onClick={toggleHighlight} className='chat-nav side-nav-link'> Make new messages</Link>

                <Link to="/" onClick={logout} className='logout-nav side-nav-link flex'>
                    <span>LOG OUT</span>
                    <BiLogIn className='logout-icon' onClick={logout}>LOG OUT</BiLogIn>
                </Link>
            </div>
        </div>
    )
}

export default SideNav;