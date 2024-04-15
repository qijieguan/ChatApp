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
    const [friends, setFriends] = useState([]);
    const [searchList, setList] = useState([]);
    const [searchTerm, setTerm] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        axios.post(baseURL +'/users/', { friend_ids: friend_ids })
        .then((response) => { setFriends(response.data) });
    }, [friend_ids, baseURL]);

    const handleSearch = (e) => {
        setTerm(e.target.value);
        
        let list = friends.filter(friend => {
            let name = friend.firstname + " " + friend.lastname;
            if (name.toLowerCase().match(e.target.value.toLowerCase())) {
                return friend;
            }
        });

        list = list.length === 0 ? friends : list; 
        setList(list);
    }

    return (
        <section>
            <div className="friend-page">

            {friends.length > 0 || searchList.length > 0 ?
                <div className='friend-wrapper grid'>
                    <div className="friend-wrapper-label flex"> 
                        <FcVoicePresentation className='friend-wrapper-icon'/>
                        <span className='friend-wrapper-text'>FRIENDS OVERVIEW</span>
                    </div>
                    <input
                        className='friend-search-input'
                        value={searchTerm}
                        onChange={(e) => {handleSearch(e)}}
                        placeholder='Enter a name to search your friends'
                    />
                    {(searchList.length > 0 ? searchList : friends).map(friend => <FriendExtend key={uuid()} friend={friend}/>)}
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