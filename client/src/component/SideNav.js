import './styles/sidenav.css';
import { BiLogIn } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { IoIosPeople, IoIosArrowBack } from 'react-icons/io';
import { FaCat } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import axios from 'axios';

import Data from './JSON/communities.json';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCommunities } from './actions/index.js';

const SideNav = (param, setShow) => {
    //const communities = Data.communities;
    //<button onClick={init}>init button</button>

    const user = JSON.parse(sessionStorage.getItem('user'));

    const location = useLocation();

    const communities = useSelector(state => state.communities);
    const dispatch = useDispatch();

    //const [communities, setCommunities] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        document.querySelector('.highlight')?.classList.remove('highlight');

        let param = '';
        if (location.pathname.includes('Post')) { param = 'post' }
        else if (location.pathname.includes('Community')) { param = 'community' }

        setTimeout(() => {
            document.getElementsByClassName(param + '-nav')[0]?.classList.add('highlight');
            if (!sessionStorage.getItem('scroll_to_post')) {
                document.getElementsByClassName('menu')[0]?.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        });

        getCommunities()
    }, [location]);

    const getCommunities = async () => {
        await axios.post(baseURL + '/communities/get/', { member_id: user._id })
        .then((response) => { 
            //setCommunities(response.data);
            dispatch((setCommunities(response.data)));
        });
    }

    const logout = () => { 
        sessionStorage.removeItem('user'); 
        sessionStorage.removeItem('isLogged');
    }

    const init = async () => {
        console.log(communities)
        await axios.post(baseURL + '/communities/init/', { communities: communities })
        .then((response) => { console.log(response.data) });
    }

    const toggleCommunityTab = (e) => {
        e.currentTarget?.classList.toggle('dropdown');
    }

    return (
        <div className={'side-nav ' + param.param}>
            <div className='side-nav-header flex'>
                <img className='side-nav-profile' src={user.profile_url} alt=""/>
                <div className='side-nav-name'>{user.firstname} {user.lastname}</div>
            </div>
            <div className='side-nav-body flex'>
                <Link to="/Dashboard/Post" className='post-nav side-nav-link flex'>
                    <AiFillHome className='home-icon'/>
                   <span>Home</span> 
                </Link>

                <Link to="/Dashboard/Community" className='community-nav side-nav-link flex'>
                    <IoIosPeople className='people-icon'/>
                    <span>Community</span> 
                </Link>

                <Link to="/" onClick={logout} className='logout-nav side-nav-link flex'>
                    <span>Log out</span>
                    <BiLogIn className='logout-icon' onClick={logout}/>
                </Link>
            </div>

            <div className='side-nav-communities'>
                <div className='side-nav-communities-label flex' onClick={toggleCommunityTab}>
                    <span>My Communities</span>
                    <IoIosArrowBack className='arrow-back-icon'/>
                </div>
                <div className='community-collection flex'>
                    {communities.length > 0 ?
                        communities.map(community => 
                            <Link 
                                to={{pathname: "/Dashboard/Community/" + community.name}} 
                                state={{communityID: community._id}} key={uuid()}
                                className='side-community flex'
                            >
                                <img className='side-community-profile' src={community.profile_url} alt=""/>
                                <div className='side-community-detail flex'>
                                    <span className='side-community-name'>{community.name}</span>
                                    <span className='side-community-members'>members: {community.members.length}</span>
                                </div>   
                            </Link>
                        )
                        :
                        <div className='community-collection-empty flex'>
                            <FaCat className='cat-icon'/>
                            <span>Wow. Much Empty</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SideNav;