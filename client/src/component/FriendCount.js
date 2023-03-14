import './styles/friend-count.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';

const FriendCount = () => {

    const friend_ids = useSelector(state => state.friends);
    const [friends, setFriends] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        if (friend_ids) {
            axios.post(baseURL +'/users/', { friend_ids: friend_ids })
            .then((response) => { setFriends(response.data) });
        }
    }, []);

    return (
        <div className='friend-count flex'>
            <h1 className='friend-count-label'>Following</h1>
            <div className='friend-headers flex'>
                {friends.length ?
                    friends.map(friend => {
                        return <img className='friend-header' src={friend.image_url} key={uuid()} alt=""/>
                    })
                    
                    :
                    <h1>Your Following is Empty. Try searching for people to follow.</h1>
                }
            </div>
        </div>
    )
}

export default FriendCount;