import './styles/chat.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import Text from './Text.js';
import Chat from './Chat.js';
import { MdArrowBack } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';

const ChatBox = () => {

    const [user, setUser] = useState("");
    const [textInp, setText] = useState("");
    const [textSet, setTextSet] = useState([]);
    const [chatSet, setChatSet] = useState([]);
    const [files, setFiles] = useState("");
    const [url, setURL] = useState("");
    const [render, setRender] = useState(false);

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
    }, [render]);

    const scrollBottom = () => {
        let element = document.querySelector(".private-chat")
        if (element) { element.scrollTop = element.scrollHeight - element.clientHeight; }
    }

    const getSelect = (id) => { sessionStorage.setItem('select', id); setRender(!render); }

    const handleChange = (event) => { setText(event.target.value); }

    const uploadText = async () => {
        if (textInp) { postText(textInp); return; }

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        await fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload', { method: 'POST', body: data })
        .then(res => res.json()).then(json => { postText(json.secure_url); });
    };

    const postText = async (content) => {
        await axios.post('/texts/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: user._id,
            content: content
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!textInp && !files) { return; }
        uploadText();
        setFiles("");
        setURL("");
        setText("");
        document.querySelector(".file").value="";
        setRender(!render);
    }

    const goBack = () => { sessionStorage.removeItem('select');  setRender(!render); }

    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const handleUpload = (e) => { e.currentTarget.childNodes[2].click(); }

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
                        <button className="back-btn flex" onClick={goBack}><MdArrowBack color='teal'/></button>
                        <span className='flex'>
                            Messaging:<img src={user.image_url} alt=""/>
                            {user.firstname + " " + user.lastname}
                        </span>
                    </div>
                    <div className="private-chat">
                        {textSet && textSet.length?
                            textSet.map(text => <Text key={uuid()} textID={uuid()} friend={user} text={text}/>)
                            :''
                        }
                    </div>
                </>
            }
            <div className='text-input-wrapper' style={{display: sessionStorage.getItem('select') ? 'flex' : 'none'}}>
                <div className='text-input'>
                    <input name='text' placeholder='Type message here...' value={textInp} onChange={handleChange}/>
                    <div className='camera-wrapper' onClick={handleUpload}>
                        <img src={url} className='upload-preview' alt=''/>
                        <FaCamera className='camera-icon' style={{display: textInp ? 'none' : ''}}/>
                        <input type="file" className="file" accept='images/*' onChange={previewFile}/>
                    </div>
                </div>
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;