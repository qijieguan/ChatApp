import { RiCloseCircleFill } from 'react-icons/ri';
import  { BsFillChatDotsFill } from 'react-icons/bs';
import { AiFillRead } from 'react-icons/ai';
import { deleteFriend } from './actions/index.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Extend = ({ friend }) => {

    const dispatch = useDispatch();

    const handleChat = () => { 
        sessionStorage.setItem('select', friend._id);
        window.location.href = '/Chatpage';
    }

    const handleUnfriend = async () => {
        await axios.post('/friends/delete/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: friend._id
        }).then((response) => { dispatch(deleteFriend(friend._id)) });
    }

    const handleEnter = () => { document.getElementById(friend._id).classList.add('focus'); }
    const handleLeave = () => { document.getElementById(friend._id).classList.remove('focus'); }

    return (
        <div className="friend-extend grid">
            <div className='unfriend-icon'><RiCloseCircleFill onClick={handleUnfriend}/></div>
            <div className='chat-icon'><BsFillChatDotsFill onClick={handleChat}/></div>
            <img src={friend.image_url} className="friend-profile" alt=""/>
            <div className="friend-name">{friend.firstname} {friend.lastname}</div>
            <AiFillRead className='friend-bio-icon'
                style={{display: friend.bio_content ? '' : 'none'}}
                onMouseEnter={handleEnter} 
                onMouseLeave={handleLeave}
            />
            <div className='friend-bio flex' id={friend._id}>
                <h1>Bio</h1>
                <span>{friend.bio_content}</span>
            </div>
        </div>
    );
} 

export default Extend;