
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineRemoveCircle } from "react-icons/md";

import { deleteFriend } from './actions/index.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

const FriendExtend = ({ friend }) => {

    const modalStyles = {
        content : {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            justifyContent: 'center',
            rowGap: '5vh',
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: 'min(95vw, 40rem)',
            height: '50%',
            transform: 'translate(-50%, -50%)', 
            color: 'wheat',
            backgroundColor: 'darkslategray',
            borderRadius: '0.5rem',
            border: '0',
            overflow: 'auto !important',
        },
        overlay: { backgroundColor: 'rgb(30, 30, 30, 0.7)', zIndex: '4' }
    };


    Modal.setAppElement(document.getElementById('root'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChat = () => { 
        sessionStorage.setItem('select', friend._id);

        navigate('/Dashboard/Chat', {replace: true});
    }

    const handleUnfriend = async () => {
        await axios.post(baseURL +'/friends/delete/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: friend._id
        }).then((response) => { dispatch(deleteFriend(friend._id)) });
        setModal(false);
    }

    return (
        <div className='friend-container flex'>
            <div className='friend-image-wrapper flex'>
                <img className="friend-image" src={friend.profile_url} alt=""/>
              
                <div className='friend-buttons flex'>
                    <button className='chat-button' onClick={() => {handleChat()}}>
                        <IoMdChatbubbles className="icon"/>
                    </button>
                    <button className='unfollow-button' onClick={() => {setModal(true)}}>
                        <MdOutlineRemoveCircle className="icon"/>
                    </button>
                </div>
                
            </div>
            
            <div className='friend-detail flex'>
                <Link className='friend-name'
                    to={"/Dashboard/Profile/" + friend.firstname + "_" + friend.lastname}
                    state={{user: friend}}
                >
                    {friend.firstname} {friend.lastname}
                </Link>
                <p className='friend-bio'>{friend.bio_content}</p>
            </div>

            <Modal isOpen={modal} style={modalStyles}>
                <h1 className='modal-unfriend-text'>Are you sure you want to unfriend <span>{friend.firstname} {friend.lastname}</span>?</h1>
                <div className='modal-unfriend-btns flex'>
                    <button className='cancel-btn' onClick={() => {setModal(false)}}>Cancel</button>
                    <button className="submit-btn" onClick={() => {handleUnfriend()}}>Confirm</button> 
                </div>
            </Modal>
        </div>
    );
} 

export default FriendExtend;