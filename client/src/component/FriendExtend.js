import { AiFillEye } from 'react-icons/ai';

import { deleteFriend } from './actions/index.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const FriendExtend = ({ friend }) => {

    const modalStyles1 = {
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
            width: 'min(95vw, 40rem)',
            height: '35%',
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'rgb(249, 249, 255)',
            border: '1px solid black',
        },
        overlay: { backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '4' }
    };

    const modalStyles2 = {
        content : {
            padding: '0',
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            textAlign: 'center',
            width: 'min(95vw, 40rem)',
            transform: 'translate(-50%, -50%)', 
            color: 'gray',
            border: '1px solid black',
            borderRadius: '0.75rem'
        },
        overlay: { backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { }, [friend._id]);

    const handleChat = () => { 
        sessionStorage.setItem('select', friend._id);

        navigate('/Dashboard/Chat', {replace: true});
    }

    const handleUnfriend = async () => {
        await axios.post(baseURL +'/friends/delete/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id,
            friend_id: friend._id
        }).then((response) => { dispatch(deleteFriend(friend._id)) });
        setModal1(false);
    }

    return (
        <div className='friend-container'>
            <div className="friend flex" id={friend._id}>
                <div className='friend-header-wrapper flex'>
                    <img src={friend.background_url} className="friend-bg" alt=""/>
                    <div className='friend-header-overlay flex'>
                        <div className="friend-name">{friend.firstname} {friend.lastname}</div>
                    </div>
                </div>
                
                <div className='friend-preview'>
                    <div className='friend-image flex'>
                        <img src={friend.profile_url} alt=""/>
                    </div>
                    <div className='friend-bio'>
                        {friend.bio_content ?
                            <span>{friend.bio_content}</span>
                            :
                            <span>*No profile bio has been set for this user*</span>
                        }
                    </div>
                </div>

                <div className='profile-view flex'
                    onClick={() => {setModal2(true)}}
                >   
                    <AiFillEye className='eye-icon'/>
                    <span>View Bio</span>
                </div>
            </div>
            <div className='friend-buttons grid'>
                <button className='chat-button flex' onClick={handleChat}>
                    Message
                </button>
                <button className='unfollow-button flex' onClick={() => {setModal1(true)}}>
                    Unfollow
                </button>
            </div>
            <Modal isOpen={modal1} style={modalStyles1}>
                <h1 className='modal-unfriend-text'>Are you sure you want to unfriend <span>{friend.firstname} {friend.lastname}</span>?</h1>
                <div className='modal-unfriend-btns flex'>
                    <button className='cancel-btn' onClick={() => {setModal1(false)}}>Cancel</button>
                    <button className="submit-btn" onClick={handleUnfriend}>Confirm</button> 
                </div>
            </Modal>

            <Modal isOpen={modal2} style={modalStyles2}>
                <div className='modal-profile flex'>
                    <img className='modal-profile-bg' src={friend.background_url} alt=""/>
                    <div className='modal-profile-info'>
                        <div className='modal-profile-name'>{friend.firstname} {friend.lastname}</div>
                        <img className='modal-profile-url' src={friend.profile_url} alt=""/>
                        <div className='modal-profile-bio'>{friend.bio_content}</div>
                    </div>
                    <button className='modal-profile-exit' onClick={() => {setModal2(false);}}>Exit View</button>
                </div>
            </Modal>
        </div>
    );
} 

export default FriendExtend;