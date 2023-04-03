import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';

const Chat = ({ chat, getSelect, removeChat }) => {

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
        <div className='chat-wrapper flex' id={chat._id}>
            <div className="chat flex" onClick={() => getSelect(chat._id)}>
                <img src={chat.profile_url} alt=""/>
                <div className='chat-preview'>
                    <h1>{chat.firstname} {chat.lastname}</h1>
                    <div className='text-preview'>{textsPreview}</div>
                </div>
            </div>
            <div className='trash-wrapper flex' onClick={() => removeChat(chat)}>
                <BsTrash className='trash-icon'/>
                <div className='trash-overlay flex'>REMOVE CONVERSATION?</div>
            </div>
        </div>
    );
}

export default Chat;