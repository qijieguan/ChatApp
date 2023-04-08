import './styles/friend.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import FriendExtend from './FriendExtend.js';
import { FcVoicePresentation } from 'react-icons/fc';
import Menu from './Menu.js';

const Friend = () => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        axios.post(baseURL +'/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids, baseURL]);

    return (
        <>
            <Menu/>
            <div className="friend-page">
            {friends.length ?
                <div className='friend-wrapper grid'>
                    <div className="friend-wrapper-label flex"> 
                        <FcVoicePresentation size={80} style={{marginRight: '1rem'}}/>
                        <div className='friend-wrapper-text'>
                            <span>CONNECTIONS OVERVIEW </span>
                        </div>
                    </div>
                    {friends.map(friend => <FriendExtend key={uuid()} friend={friend}/>)}
                </div>
                :
                <h1>Add other users as friends!</h1>
            }
            </div>
        </>
    );
}

export default Friend;