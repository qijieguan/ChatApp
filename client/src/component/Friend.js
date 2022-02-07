import { useSelector } from 'react-redux';
import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import Extend from './FriendExtend.js';
const Friend = () => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    useEffect(() => {
        axios.post('/users', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids])

    return (
        <div id="friend">
           {friends.length > 0 ?
                <>
                    <h1>Friends</h1>
                    {friends.map(friend => <Extend key={uuid()} friend={friend}/>)}
                </>
                :
                <h1>Connect and form new friendships!</h1>
           }
        </div>
    );
}

export default Friend;