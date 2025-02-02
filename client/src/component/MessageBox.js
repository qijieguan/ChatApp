import './styles/message.css';
import { MdArrowBack } from 'react-icons/md';
import { FaCamera, FaCat } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { BsThreeDots } from "react-icons/bs";

import axios from 'axios';
import { useState, useEffect } from 'react';

import uuid from 'react-uuid';
import Text from './Text.js';

const MessageBox = ({ renderChatLog }) => {

    const [user, setUser] = useState("");
    const [files, setFiles] = useState("");
    const [url, setURL] = useState("");
    const [textSet, setTextSet] = useState([]);
    const [render, setRender] = useState(false);
    const [textInp, setTextInp] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const selectMsg = sessionStorage.getItem('select');

    useEffect(() => { 
        setTimeout(() => { renderConversation(); }, 250);
    }, [render, selectMsg, baseURL]);

    const renderConversation = async () => {
        await axios.post(baseURL +'/users/select/', {user_id: sessionStorage.getItem('select')})
        .then((response) => { 
            setUser(response.data);
            axios.post(baseURL +'/texts/select/', {
                user_id: JSON.parse(sessionStorage.getItem('user'))._id,
                friend_id: response.data._id
            }).then((response) => { setTextSet(response.data.texts); });
        });
    }

    const scrollBottom = () => {
        let element = document.querySelector(".private-message");
        if (element) { element.scrollTo(0, element.clientHeight); }
    }

    const postText = async (content) => {
        await axios.post(baseURL +'/texts/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: user._id,
            content: content
        })
        renderChatLog(); 
    }

    const uploadText = async () => {
        if (textInp.length) { postText(textInp); setRender(!render); return; }

        const data = new FormData();
        data.append('file', files[0]);
    
        await axios.post(baseURL + '/cloud/upload-image', data)
        .then((response) => {
            postText(response.data);
            setRender(!render);
        });        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!textInp.length && !files) { return; }
        uploadText();
        setFiles("");
        setURL("");
        setTextInp("");
        document.querySelector('.camera-icon').style.display = "";
        document.querySelector(".file").value="";
        renderConversation();
    }

    const goBack = () => { 
        document.getElementById(selectMsg)?.classList.remove('highlight');
        sessionStorage.removeItem('select'); 
        setTextSet([]); 

        document.querySelector('.conversation-log')?.classList.add('focus');
        document.querySelector('.message-container')?.classList.remove('focus');
        document.querySelector('.menu-bar')?.scrollIntoView({ block: 'start', behavior: 'smooth'});
    }

    const readFiles = (files) => {
        if (!files) { return; }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const handleUpload = (e) => { e.currentTarget.childNodes[2].click(); }

    const handleChange = (e) => { setTextInp(e.target.value) }

    const removeChat = async () => {
        await axios.post(baseURL +'/texts/delete', { 
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: sessionStorage.getItem('select')
        })
      
        let backBtn = document.getElementById('back-btn');
        backBtn.click();
      
        renderChatLog();
    }

    return (
        <div className='message-container'>
            {user &&
                <div className="private-message-header flex">
                    <button id="back-btn" className='flex' onClick={goBack}><MdArrowBack/></button>
                    <div className='private-message-headshot flex'>
                        <img src={user.profile_url} alt=""/>
                        <span className='recipient'>{user.firstname + " " + user.lastname}</span>
                    </div>
                    <button className='trash-btn'>
                        <BsThreeDots className='trash-icon'/>
                        <span className='trash-text' onClick={() => {removeChat()}}>Trash Conversations</span>
                    </button>
                </div>
            }

            <div className="private-message flex">
                {textSet ?
                    textSet.map(text => <Text key={uuid()} textID={uuid()} friend={user} text={text}/>)
                    :
                    <div className='private-message-empty flex'>
                        <span>Tap a conversation to see messages</span>
                        <FaCat className='cat-icon'/>
                    </div>
                }

                <div className='end-message grid flex' onLoad={scrollBottom}>
                    <hr/>
                    <span>End of Message</span>
                    <hr/>
                </div>
            </div>
            {selectMsg && 
                <div className='text-input-wrapper'>
                    <div className='text-input flex'>
                        <input name='text' className='text' 
                            value={textInp}
                            placeholder='Type message here...' 
                            onChange={handleChange}
                        />
                        <div className='camera-wrapper flex' onClick={handleUpload}>
                            <img src={url} className='upload-preview' alt=''/>
                            <FaCamera className='camera-icon'/>
                            <input type="file" className="file" accept='images/*' onChange={previewFile}/>
                        </div>
                        <div className='send-button flex' onClick={handleSubmit}>
                            <AiOutlineSend className='send-icon'/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageBox;