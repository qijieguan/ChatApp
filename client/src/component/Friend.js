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

    useEffect(() => {
        axios.post('/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids])

    return (
        <>
            <SideNav/>
            <div className="friend">
            {friends.length ?
                <>
                    <h1 className="flex" style={{marginBottom: '50px'}}> 
                        <FcVoicePresentation size={80} style={{marginRight: '1rem'}}/>
                        My Friends 
                    </h1>
                    {friends.map(friend => <Extend key={uuid()} friend={friend}/>)}
                </>
                :
                <h1>Add other users as friends!</h1>
            }
            </div>
        </>
    );
}

export default Friend;