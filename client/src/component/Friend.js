import { useSelector } from 'react-redux';
import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import Extend from './FriendExtend.js';
import { FcVoicePresentation } from 'react-icons/fc';

const Friend = () => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    useEffect(() => {
        axios.post('/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids])

    return (
        <div id="friend">
           {friends.length ?
                <>
                    <h1 style={{color: 'rgb(65, 65, 255)', letterSpacing: '2px', textShadow: '0 0 1px navy'}}> 
                        My Friends 
                        <FcVoicePresentation size={80} style={{margin: '0 0 10px 10px'}}/>
                    </h1>
                    {friends.map(friend => <Extend key={uuid()} friend={friend}/>)}
                </>
                :
                <h1>Connect and form new friendships!</h1>
           }
        </div>
    );
}

export default Friend;