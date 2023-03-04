import './styles/friend.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import Extend from './FriendExtend.js';
import { FcVoicePresentation } from 'react-icons/fc';
import SideNav from './SideNav.js';

const Friend = () => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        axios.post(baseURL +'/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids]);

    return (
        <>
            <SideNav/>
            <div className="friend">
            {friends.length ?
                <div className='friend-wrapper grid'>
                    <h1 className="flex" style={{margin: '3rem 0'}}> 
                        <FcVoicePresentation size={80} style={{marginRight: '1rem'}}/>
                        CONNECTIONS
                    </h1>
                    {friends.map(friend => <Extend key={uuid()} friend={friend}/>)}
                </div>
                :
                <h1>Add other users as friends!</h1>
            }
            </div>
        </>
    );
}

export default Friend;