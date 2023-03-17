import { RiCloseCircleFill } from 'react-icons/ri';
import  { BsFillChatDotsFill } from 'react-icons/bs';
import { AiFillRead } from 'react-icons/ai';
import { deleteFriend } from './actions/index.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { useState } from 'react';


const Extend = ({ friend }) => {

    const modalStyles = {
        content : {
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            justifyContent: 'space-around',
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            textAlign: 'center',
            width: 'max(20rem, 35%)',
            height: '35%',
            transform: 'translate(-50%, -50%)', 
            color: 'white',
            backgroundColor: 'rgb(30,30,30)'
        },
        overlay: { zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const handleChat = () => { 
        sessionStorage.setItem('select', friend._id);
        window.location.href = '/Dashboard';
    }

    const handleUnfriend = async () => {
        await axios.post(baseURL +'/friends/delete/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: friend._id
        }).then((response) => { dispatch(deleteFriend(friend._id)) });
        setModal(false);
    }

    return (
        <div className="friend flex">
            <img src={friend.image_url} className="friend-image" alt=""/>
            <div className="friend-name">{friend.firstname} {friend.lastname}</div>
         
            <div className='friend-preview'>
                <div className='friend-bio' id={friend._id}>
                    <h1>Bio</h1>
                    <span>{friend.bio_content}</span>
                </div>
                <div className='friend-buttons flex'>
                    <div className='chat-icon flex'><BsFillChatDotsFill onClick={handleChat}/></div>
                    <div className='unfriend-icon flex'><RiCloseCircleFill onClick={() => {setModal(true)}}/></div>
                </div>

                <Modal isOpen={modal} style={modalStyles}>
                    <h1 className='modal-text'>Are you sure you want to unfriend <span>{friend.firstname} {friend.lastname}</span>?</h1>
                    <div className='modal-btns flex'>
                        <button className='cancel-btn' onClick={() => {setModal(false)}}>Cancel</button>
                        <button className="submit-btn" onClick={handleUnfriend}>Confirm</button> 
                    </div>
                </Modal>
            </div>
          
        </div>
    );
} 

export default Extend;