import { Link } from 'react-router-dom';
import './styles/sidenav.css';
import { useEffect } from 'react';

const SideNav = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => { init(); }, [])

    const init = () => {
        let url_param = window.location.href;
    
        if (url_param.includes('Post')) {
            document.querySelector('.post-nav')?.classList.add('highlight');
        }
        else {
            document.querySelector('.chat-nav')?.classList.add('highlight');
        }
    }


    return (
        <div className='side-nav'>
            <div className='side-nav-image'>
                <img className='side-nav-bg' src={user.background_url} alt=""/>
                <img className='side-nav-profile' src={user.profile_url} alt=""/>
                <div className='side-nav-name'><span>{user.firstname} </span> <span>{user.lastname}</span> </div>
            </div>
            <div className='side-nav-body flex'>
                <Link to="/Profile" className='profile-nav side-nav-link'>View Profile</Link>
                <Link to="/Dashboard/Post" className='post-nav side-nav-link'>My Posts</Link>
                <Link to="/Dashboard/Chat" className='chat-nav side-nav-link'>My Messages</Link>
            </div>
        </div>
    )
}

export default SideNav;