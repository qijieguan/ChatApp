import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';

const Conversation = ({ chat, getSelect, removeChat }) => {

    const [textsPreview, setPreview] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const getPreviewText = async () => {
        await axios.post(baseURL +'/texts/preview', { 
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: chat._id 
        })
        .then (response => { setPreview(response.data) });
    }

    getPreviewText();

    return (
        <div className='conversation-wrapper flex' id={chat._id}>
            <div className="conversation flex" onClick={() => getSelect(chat._id)}>
                <img src={chat.profile_url} alt=""/>
                <div className='conversation-preview'>
                    <h1>{chat.firstname} {chat.lastname}</h1>
                    <div className='text-preview'>{textsPreview}</div>
                </div>
            </div>
            <div className='trash-wrapper flex'>
                <BsTrash className='trash-icon' onClick={() => removeChat(chat)}/>
                <div className='trash-overlay flex'>Remove conversation?</div>
            </div>
        </div>
    );
}

export default Conversation;