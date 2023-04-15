import './styles/chat.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import Conversation from './Conversation.js';
import MessageBox from './MessageBox.js';

const ChatPage = () => {

    const [chatLog, setchatLog] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { 
        if (sessionStorage.getItem('select')) {
            setTimeout(() => {
                document.querySelector('.message-container')?.scrollIntoView({ block: 'start', inline:'nearest', behavior: 'smooth' });
            }, 500);
        }
        getChatLog(); 
    }, [baseURL]);

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
        document.querySelector('.message-container')?.scrollIntoView({ block: 'start', inline:'nearest', behavior: 'smooth' });
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
            <div className="conversation-log">
                <div className='conversation-label flex'>Conversations</div>
                <div className='conversation-set flex'>
                    {chatLog && chatLog.length ?
                        chatLog.map(chat => <Conversation key={uuid()} chat={chat} getSelect={getSelect} removeChat={removeChat}/>)
                        :
                        <h1 className='conversation-default'>No Chat Log Exists</h1>
                    }
                </div>
            </div>
            <MessageBox initChatLog={initChatLog}/>     
        </div>
                    
    );
}

export default ChatPage;