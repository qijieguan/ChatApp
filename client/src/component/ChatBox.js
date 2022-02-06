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
    const [update, setUpdate] = useState(false);

    const select = sessionStorage.getItem('select');

    useEffect(() => {
        if (!select) {
            axios.post('http://localhost:3001/texts/', {
                user_id: JSON.parse(sessionStorage.getItem('user'))._id
            })
            .then((response) => { setChatSet(response.data) }); 
        } 
        else {
            axios.post('http://localhost:3001/users/select/', {user_id: select})
            .then((response) => { 
                setUser(response.data);
                axios.post('http://localhost:3001/texts/select/', {
                    user_id: JSON.parse(sessionStorage.getItem('user'))._id,
                    friend_id: response.data._id
                }).then((response) => setTextSet(response.data.text));
            });
        }  
    }, [select, update])

    const getSelect = (id) => { sessionStorage.setItem('select', id); setUpdate(!update); }

    const handleChange = (event) => { setText(event.target.value); }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!textInp) {return;}
        axios.post('http://localhost:3001/texts/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: user._id,
            content: textInp
        });
        setUpdate(!update);
        setChatSet([]);
        setText("");
    }

    const goBack = () => { sessionStorage.removeItem('select'); setUpdate(!update); }

    return (
        <div id="chat-container">
            <div id='chat-label'>Chat Log</div>
            {!select ?
                <div id='chat-set'>
                    {chatSet > 0 ?
                        chatSet.length ?
                            chatSet.map(chat => 
                            <Chat key={uuid()} chat={chat} getSelect={getSelect}/>)
                        :''
                        :''
                    }
                </div>
                : 
                <>
                    <div id="private-chat-header">
                        <button id="back-btn" onClick={goBack}>
                            <MdArrowBack size={36} color='limegreen'/>
                        </button>
                        To:<img src={user.image_url} alt=""/>
                        {user.firstname + " " + user.lastname}
                    </div>
                    <div id="private-chat">
                        {textSet ?
                            textSet.length ?
                                textSet.map(text => <Text key={uuid()} friend={user} text={text}/>)
                            :''
                            :''
                        }
                    </div>
                </>
            }
            <div id='text-input' style={{display: select ? 'block' : 'none'}}>
                <input name='text' value={textInp} onChange={handleChange}/>
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;