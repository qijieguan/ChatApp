import './styles/chat.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import Conversation from './Conversation.js';
import MessageBox from './MessageBox.js';

const ChatPage = () => {

    const [chatLog, setChatLog] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { 
        if (sessionStorage.getItem('select')) {
            document.querySelector('.conversation-log')?.classList.remove('focus');
            document.querySelector('.message-container')?.classList.add('focus');
        }
        
        if (window.location.href.includes('Chat')) {
            document.querySelector('.chat-nav')?.classList.add('highlight');
        }
       
        getChatLog(); 
    }, [baseURL]);

    const getChatLog = async () => {
        await axios.post(baseURL +'/texts/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id })
        .then((response) => { setChatLog(response.data) });
         
        let id = sessionStorage.getItem('select');
        if (id) { setTimeout(() => { document.getElementById(id)?.classList.add('highlight');}, 250); };
    }

    const getSelect = (chat_id) => { 
        sessionStorage.setItem('select', chat_id);
        getChatLog();

        document.querySelector('.conversation-log')?.classList.remove('focus');
        document.querySelector('.message-container')?.classList.add('focus');
        
        window.scrollTo(0, 0);
    }

    const renderChatLog = () => { getChatLog() };

    return (
        <div className='chat-page grid'>
            <MessageBox renderChatLog={renderChatLog}/>     
            <div className="conversation-log focus">
                <div className='conversation-label flex'>Conversations</div>
                <div className='conversation-set flex'>
                    {chatLog && chatLog.length ?
                        chatLog.map(chat => 
                            <Conversation key={uuid()} chat={chat} getSelect={getSelect}/>
                        )
                        :
                        <h1 className='conversation-default'>No Conversations Exists</h1>
                    }
                </div>
            </div>
        </div>
                    
    );
}

export default ChatPage;