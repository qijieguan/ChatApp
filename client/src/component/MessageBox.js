import './styles/message.css';
import { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import uuid from 'react-uuid';
import Text from './Text.js';

const MessageBox = ({ initChatLog }) => {

    const [user, setUser] = useState("");
    const [files, setFiles] = useState("");
    const [url, setURL] = useState("");
    const [textSet, setTextSet] = useState([]);
    const [render, setRender] = useState(false);
    var textInp = document.querySelector('.text');

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const selectMsg = sessionStorage.getItem('select');

    useEffect(() => { renderConversation(); }, [render, selectMsg, baseURL]);

    const renderConversation = async () => {
        await axios.post(baseURL +'/users/select/', {user_id: sessionStorage.getItem('select')})
        .then((response) => { 
            setUser(response.data);
            axios.post(baseURL +'/texts/select/', {
                user_id: JSON.parse(sessionStorage.getItem('user'))._id,
                friend_id: response.data._id
            }).then((response) => { setTextSet(response.data.texts); });
            setTimeout(() => {scrollBottom();}, 500);
        });
    }

    const scrollBottom = () => {
        let element = document.querySelector(".private-message")
        if (element) { element.scrollTop = element.scrollHeight - element.clientHeight; }
    }

    const postText = async (content) => {
        await axios.post(baseURL +'/texts/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: user._id,
            content: content
        });
        if (!textSet) { initChatLog(); }
    }

    const uploadText = async () => {
        if (textInp.value) { postText(textInp.value); setRender(!render); return; }

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        await fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload', { method: 'POST', body: data })
        .then(res => res.json()).then(json => { postText(json.secure_url); setRender(!render); });

        /*
        await axios.post(baseURL + '/texts/upload-image', data)
        .then((response) => {
            postText(response.data);
            setRender(!render);
        });
        */
               
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!textInp.value && !files) { return; }
        uploadText();
        setFiles("");
        setURL("");
        textInp.value = '';
        document.querySelector('.camera-icon').style.display = "";
        document.querySelector(".file").value="";
    }

    const goBack = () => { 
        document.getElementById(selectMsg)?.classList.remove('highlight');
        sessionStorage.removeItem('select'); 
        setTextSet([]); 
    }

    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const handleUpload = (e) => { e.currentTarget.childNodes[2].click(); }

    const handleChange = (e) => {
        if (e.target.value) { document.querySelector('.camera-icon').style.display = "none" } 
        else { document.querySelector('.camera-icon').style.display = ""; }
    }

    return (
        <div className='message-container'>
            <div className="private-message-header">
                {user ?
                <div className='flex'>
                    <button id="back-btn" className='flex' onClick={goBack}><MdArrowBack/></button>
                    <span className='flex'>
                        Messaging:<img src={user.image_url} alt=""/>
                        {user.firstname + " " + user.lastname}
                    </span>
                </div>
                    : ""
                }
            </div>
            <div className="private-message">
                {textSet?
                    textSet.map(text => <Text key={uuid()} textID={uuid()} friend={user} text={text}/>)
                    :<h1>Select a Chat head to Open Message Log</h1>
                }
            </div>
            {selectMsg ? 
                <div className='text-input-wrapper flex'>
                    <div className='text-input'>
                        <input name='text' className='text' placeholder='Type message here...' onChange={handleChange}/>
                        <div className='camera-wrapper' onClick={handleUpload}>
                            <img src={url} className='upload-preview' alt=''/>
                            <FaCamera className='camera-icon'/>
                            <input type="file" className="file" accept='images/*' onChange={previewFile}/>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Send</button>
                </div>
                :
                ''
            }
        </div>
    );
};

export default MessageBox;