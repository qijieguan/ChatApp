import './styles/chat.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import Text from './Text.js';
import Chat from './Chat.js';
import { MdArrowBack } from 'react-icons/md';

const ChatBox = () => {

    const [user, setUser] = useState("");
    const [textInp, setText] = useState("");
    const [textSet, setTextSet] = useState([]);
    const [chatSet, setChatSet] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('select')) {
            axios.post('/texts/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id })
            .then((response) => { setChatSet(response.data) }); 
        } 
        else {
            axios.post('/users/select/', {user_id: sessionStorage.getItem('select')})
            .then((response) => { 
                setUser(response.data);
                axios.post('/texts/select/', {
                    user_id: JSON.parse(sessionStorage.getItem('user'))._id,
                    friend_id: response.data._id
                }).then((response) => {setTextSet(response.data.text); scrollBottom();});
            });
        }  
    }, [reload]);

    const scrollBottom = () => {
        let element = document.querySelector(".private-chat")
        if (element) { element.scrollTop = element.scrollHeight; }
    }

    const getSelect = (id) => { sessionStorage.setItem('select', id); setReload(!reload); }

    const handleChange = (event) => { setText(event.target.value); }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!textInp) {return;}
        await axios.post('/texts/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: user._id,
            content: textInp
        });
        setText("");
        setReload(!reload);
    }

    const goBack = () => { sessionStorage.removeItem('select');  setReload(!reload); }

    return (
        <div className="chat-container">
            <div className='chat-label flex'>Chat Log</div>
            {!sessionStorage.getItem('select') ?
                <div className='chat-set flex'>
                    {chatSet && chatSet.length ?
                        chatSet.map(chat => <Chat key={uuid()} chat={chat} getSelect={getSelect}/>)
                        :
                        <h1 className='chat-default'>No Chat Log Exists</h1>
                    }
                </div>
                : 
                <>
                    <div className="private-chat-header flex">
                        <button className="back-btn" onClick={goBack}><MdArrowBack size={36} color='teal'/></button>
                        <span className='flex'>
                            Messaging:<img src={user.image_url} alt=""/>
                            {user.firstname + " " + user.lastname}
                        </span>
                    </div>
                    <div className="private-chat">
                        {textSet && textSet.length?
                            textSet.map(text => <Text key={uuid()} friend={user} text={text}/>)
                            :''
                        }
                    </div>
                </>
            }
            <div className='text-input' style={{display: sessionStorage.getItem('select') ? 'flex' : 'none'}}>
                <input name='text' placeholder='Type message here...' value={textInp} onChange={handleChange}/>
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;