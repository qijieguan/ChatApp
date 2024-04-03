import './styles/friend-count.css';
import { CircularProgress } from '@mui/material';

import { useSelector } from 'react-redux';
import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';

const FriendCount = ({userID}) => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(async () => {
        getFriends();
    }, [baseURL, friend_ids]);

    const getFriends = async () => {
        if (userID !== JSON.parse(sessionStorage.getItem('user'))._id) {
            axios.post(baseURL +'/friends/', { user_id: userID, })
            .then((response) => { getFriendsCall(response.data); }); 
        }
        else {
            if (friend_ids) { getFriendsCall(friend_ids); }
        }
    }

    const getFriendsCall = async (friendIDS) => {
        await axios.post(baseURL +'/users/', { friend_ids: friendIDS })
        .then((response) => { setFriends(response.data) });
    } 

    return (
        <div className='friend-count flex'>
            <h1 className='friend-count-label'>Following</h1>
            <div className='friend-headers flex'>
                {friends.length ?
                    friends.map(friend => {
                        return <img className='friend-header' src={friend.profile_url} key={uuid()} alt=""/>
                    })
                    :
                    <div className='loading-screen-wrapper flex'>
                        <CircularProgress className='loading-screen'
                            sx={{color:"darkslategray"}} 
                        />
                        <span>Loading</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default FriendCount;