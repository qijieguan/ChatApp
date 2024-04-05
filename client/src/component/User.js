import { BsThreeDots } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend } from './actions/index.js';
import { useEffect, useState } from 'react';

const User = ({ user }) => {

    const [isFriend, setFriend] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const friends = useSelector(state => state.friends);
    const dispatch = useDispatch();

    useEffect(() => { 
        //friends.forEach(friend_id => { if (friend_id === user._id) { setFriend(true); } });
        if (friends.includes(user._id)) { setFriend(true); }
        else { setFriend(false); }
    }, [friends, user._id]);

    const handleAdd = async () => {
        await axios.post(baseURL +'/friends/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: user._id
        }).then((response) => { dispatch(addFriend(response.data)); setFriend(true)});
    }

    return (
        <div className='user' id={user._id}>
            <div className="icon-wrapper">
                <BsThreeDots className="icon"/>
                <div className="user-actions">
                    {isFriend ?
                        <span>Already Following</span>
                        :
                        <div className="icon-wrapper flex" onClick={() => {handleAdd()}}>
                            <IoPersonAddSharp className="person-icon"/>
                            <span>Follow Me</span>
                        </div>
                    }
                </div>
            </div>
            <img className="user-image" src={user.profile_url} alt=""/>
            <div className='user-detail flex'>
                <span className="user-name"> {user.firstname} {user.lastname} </span>
                <p className='user-bio'>{
                    user.bio_content ? user.bio_content
                    :
                    "Wow. Much Empty."
                }</p>
            </div>
        </div> 
    );
}

export default User;