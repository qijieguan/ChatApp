import { Link } from 'react-router-dom';
import './styles/sidenav.css';

const SideNav = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    const toggleHighlight = (event) => {
        document.querySelector('.highlight')?.classList.remove('highlight');
        event.target?.classList.add('highlight');

        setTimeout(() => {
            document.querySelector('.post-section')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 500);
    }


    return (
        <div className='side-nav'>
            <div className='side-nav-image'>
                <img className='side-nav-bg' src={user.background_url} alt=""/>
                <img className='side-nav-profile' src={user.profile_url} alt=""/>
                <div className='side-nav-name'><span>{user.firstname} </span> <span>{user.lastname}</span> </div>
            </div>
            <div className='side-nav-body flex'>
                <Link to="/Profile" onClick={toggleHighlight} className='profile-nav side-nav-link'>See your profile</Link>
                <Link to="/Dashboard/Post" onClick={toggleHighlight} className='post-nav side-nav-link'> Browse all posts</Link>
                <Link to="/Dashboard/Chat" onClick={toggleHighlight} className='chat-nav side-nav-link'> Make new messages</Link>
            </div>
        </div>
    )
}

export default SideNav;