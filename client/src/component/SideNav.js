import './styles/sidenav.css';

import { BsThreeDots } from "react-icons/bs";
import { FaCat } from 'react-icons/fa';
import { RiMenu2Fill } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import axios from 'axios';

import Data from './JSON/communities.json';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCommunities } from './actions/index.js';

const SideNav = ({mode}) => {
    //const communities = Data.communities;
    //<button onClick={init}>init button</button>

    const user = JSON.parse(sessionStorage.getItem('user'));

    const location = useLocation();

    const friend_ids = useSelector(state => state.friends);
    const communities = useSelector(state => state.communities);
    const dispatch = useDispatch();

    //const [communities, setCommunities] = useState([]);
    const [friends, setFriends] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        getFriends();
        getCommunities();
    }, [location, friend_ids]);

    const getFriends = () => {
        axios.post(baseURL +'/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }

    const getCommunities = async () => {
        await axios.post(baseURL + '/communities/get/', { member_id: user._id })
        .then((response) => { 
            //setCommunities(response.data);
            dispatch((setCommunities(response.data)));
        });
    }

    const init = async () => {
        console.log(communities)
        await axios.post(baseURL + '/communities/init/', { communities: communities })
        .then((response) => { console.log(response.data) });
    }

    const closeSideNav = () => {
        document.querySelector('.side-nav.dynamic')?.classList.remove('active');
    }

    return (
        <div className={'side-nav flex ' + mode}>
            {mode === 'dynamic' && <RiMenu2Fill className='menu-icon' onClick={() => closeSideNav()}/>}
       
            <section className='side-nav-communities side-nav-section flex'>
                <label className='side-nav-communities-label side-label flex'>
                    My Group
                    <div className='icon-wrapper'>
                        <BsThreeDots className='icon'/>
                        <Link 
                            to={{pathname: "/Dashboard/Community"}}  
                            className='side-nav-link'
                            onClick={() => {closeSideNav()}}
                        >
                            View Communities
                        </Link>
                    </div>
                </label>
                <div className='community-collection side-collection flex'>
                    {communities.length > 0 ?
                        communities.map(community => 
                            <Link 
                                to={{pathname: "/Dashboard/Community/" + community.name}} 
                                state={{communityID: community._id}} key={uuid()}
                                className='side-community side-li grid'
                                onClick={() => {closeSideNav()}}
                            >
                                <img className='side-community-profile side-li-profile' src={community.profile_url} alt=""/>
                                <span className='side-community-name side-li-name'>{community.name}</span>          
                            </Link>
                        )
                        :
                        <div className='community-collection-empty side-empty flex'>
                            <FaCat className='cat-icon'/>
                            <span>Wow. Much Empty</span>
                        </div>
                    }
                </div>
            </section>


            <section className='side-nav-friends side-nav-section flex'>
                <label className='side-nav-friends-label side-label flex'>
                    Friends
                    <div className='icon-wrapper'>
                        <BsThreeDots className='icon'/>
                        <Link 
                            to={{pathname: "/Dashboard/Friend"}}  
                            className='side-nav-link'
                            onClick={() => {closeSideNav()}}
                        >
                            View Friends
                        </Link>
                    </div>
                </label>
                <div className='friend-collection side-collection flex'>
                    {friends.length > 0 ?
                        friends.map(friend => 
                            <Link 
                                to={"/Dashboard/Profile/" + friend.firstname + "_" + friend.lastname}
                                state={{user: friend}}
                                className='side-friend side-li grid' key={uuid()}
                                onClick={() => {closeSideNav()}}
                            >
                                <img className='side-friend-profile side-li-profile' src={friend.profile_url} alt=""/>
                                <span  className='side-friend-name side-li-name'>{friend.firstname + " " + friend.lastname}</span>
                            </Link>
                        )
                        :
                        <div className='friend-collection-empty side-empty flex'>
                            <FaCat className='cat-icon'/>
                            <span>Wow. Much Empty</span>
                        </div>
                    }
                </div>
            </section>
        </div>
    )
}

export default SideNav;