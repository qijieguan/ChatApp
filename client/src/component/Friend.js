import './styles/friend.css';
import { FcVoicePresentation } from 'react-icons/fc';
import { CircularProgress } from '@mui/material';

import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FriendExtend from './FriendExtend.js';

const Friend = () => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        axios.post(baseURL +'/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids, baseURL]);

    return (
        <section>
            <div className="friend-page">

            {friends.length ?
                <div className='friend-wrapper grid'>
                    <div className="friend-wrapper-label flex"> 
                        <FcVoicePresentation className='friend-wrapper-icon'/>
                        <span className='friend-wrapper-text'>FRIENDLIST OVERVIEW</span>
                    </div>
                    {friends.map(friend => <FriendExtend key={uuid()} friend={friend}/>)}
                </div>
                :
                <div className='loading-screen-wrapper flex'>
                    <CircularProgress className='loading-screen'
                        sx={{color:"darkslategray"}} 
                    />
                    <span>Loading</span>
                </div>
            }
            </div>
        </section>
    );
}

export default Friend;