import { RiCloseCircleFill } from 'react-icons/ri';
import  { BsFillChatDotsFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteFriend } from './actions/index.js';
import axios from 'axios';

const Extend = ({ friend }) => {

    const dispatch = useDispatch();

    const handleUnfriend = () => {
        axios.post('http://localhost:3001/friends/delete/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: friend._id
        }).then((response) => { dispatch(deleteFriend(friend._id)) });
    }

    return (
        <div className="friend-extend">
            <div className='friend-container'>
                <img src={friend.image_url} className="friend-profile" alt=""/>
                <div className="friend-name">{friend.firstname} {friend.lastname}</div>
                <BsFillChatDotsFill className='chat-icon' size={20}/>
                <div className='unfriend-icon'>
                    <RiCloseCircleFill size={24} onClick={handleUnfriend}/>
                </div>
            </div>
        </div>
    );
} 

export default Extend;