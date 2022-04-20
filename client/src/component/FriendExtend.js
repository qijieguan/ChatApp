import { RiCloseCircleFill } from 'react-icons/ri';
import  { BsFillChatDotsFill } from 'react-icons/bs';
import { deleteFriend } from './actions/index.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Extend = ({ friend }) => {

    const dispatch = useDispatch();

    const handleChat = () => { 
        sessionStorage.setItem('select', friend._id);
        window.location.href = '/Dashboard';
    }

    const handleUnfriend = async () => {
        await axios.post('/friends/delete/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: friend._id
        }).then((response) => { dispatch(deleteFriend(friend._id)) });
    }

    return (
        <div className="friend-extend grid">
            <div className="animated-overlay"/>
            <div className='unfriend-icon'><RiCloseCircleFill onClick={handleUnfriend}/></div>
            <div className='chat-icon'><BsFillChatDotsFill onClick={handleChat}/></div>
            <img src={friend.image_url} className="friend-profile" alt=""/>
            <div className="friend-name">{friend.firstname} {friend.lastname}</div>
        </div>
    );
} 

export default Extend;