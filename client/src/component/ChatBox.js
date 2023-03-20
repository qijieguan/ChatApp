import './styles/chat.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import Chat from './Chat.js';
import MessageBox from './MessageBox.js';

const ChatBox = () => {

    const [chatLog, setchatLog] = useState([]);
    const [textsPreview, setPreview] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { getChatLog(); }, [baseURL]);

    const getChatLog = async () => {
        await axios.post(baseURL +'/texts/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id })
        .then((response) => { 
            setchatLog(response.data) 
        }); 
        let id = sessionStorage.getItem('select');
        if (id) { setTimeout(() => { document.getElementById(id)?.classList.add('highlight');}, 250); };
    }

    const getSelect = (chat_id) => { 
        sessionStorage.setItem('select', chat_id);
        getChatLog();
    }

    const removeChat = async (chat) => {
        setchatLog(chatLog.filter(chatHead => chatHead._id !== chat._id));
        await axios.post(baseURL +'/texts/delete', { 
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: chat._id 
        })
        .then((response) => { 
            if (sessionStorage.getItem('select') === chat._id) { 
                let backBtn = document.getElementById('back-btn');
                backBtn.click();
            } 
        }); 
    }

    const initChatLog = () => { getChatLog() };

    return (
        <div className='chat-page grid'>
            <div className="chat-log">
                <div className='chat-label flex'>Active Conversations</div>
                <div className='chat-set flex'>
                    {chatLog && chatLog.length ?
                        chatLog.map(chat => <Chat key={uuid()} chat={chat} getSelect={getSelect} removeChat={removeChat}/>)
                        :
                        <h1 className='chat-default'>No Chat Log Exists</h1>
                    }
                </div>
            </div>
            <MessageBox initChatLog={initChatLog}/>     
        </div>
                    
    );
}

export default ChatBox;