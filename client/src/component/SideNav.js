import './styles/sidenav.css';
import { BiLogIn } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';

import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import Data from './JSON/communities.json';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SideNav = () => {

    const communities = Data.communities;

    const [clicked, setClicked] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user'));

    const location = useLocation();

    useEffect(() => {
        document.querySelector('.highlight')?.classList.remove('highlight');

        let param = '';
        if (location.pathname.includes('Post')) { param = 'post' }
        else if (location.pathname.includes('Community')) { param = 'community' }


        setTimeout(() => {
            document.getElementsByClassName(param + '-nav')[0]?.classList.add('highlight');

            if (clicked) {
                document.getElementsByClassName(param + '-section')[0]?.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        });
    }, [location, clicked]);

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
                <Link to="/Dashboard/Post" onClick={() => {setClicked(true)}} className='post-nav side-nav-link flex'>
                    <AiFillHome className='home-icon'/>
                   <span>Home</span> 
                </Link>

                <Link to="/Dashboard/Community" onClick={() => {setClicked(true)}} className='community-nav side-nav-link flex'>
                    <IoIosPeople className='people-icon'/>
                    <span>Community</span> 
                </Link>

                <Link to="/" onClick={logout} className='logout-nav side-nav-link flex'>
                    <span>Log out</span>
                    <BiLogIn className='logout-icon' onClick={logout}/>
                </Link>
            </div>

            <div className='side-nav-communities'>
                <h1>My Communities</h1>
                <div className='community-collection flex'>
                    {communities.length &&
                        communities.map(community => 
                            <div className='side-community flex' key={uuid()}>
                                <img className='side-community-profile' src={community.profile_url} alt=""/>
                                <div className='side-community-detail flex'>
                                    <span className='side-community-name'>{community.name}</span>
                                    <span className='side-community-members'>members: {community.members.length}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SideNav;