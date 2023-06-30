import { AiFillEye } from 'react-icons/ai';

import { deleteFriend } from './actions/index.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const FriendExtend = ({ friend }) => {

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
            color: 'gray',
            backgroundColor: 'white',
            border: '1px solid black',
        },
        overlay: { backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [modal, setModal] = useState(false);

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
        setModal(false);
    }

    const openView = (friendID, e) => {
        document.getElementById(friendID)?.querySelector('.friend-preview')?.classList.add('expand');
    }

    const closeView = (friendID, e) => {
        document.getElementById(friendID)?.querySelector('.friend-preview')?.classList.remove('expand');
    }


    return (
        <div className='friend-container'>
            <div className="friend flex" id={friend._id}>
                <div className='friend-header-wrapper flex'>
                    <img src={friend.background_url} className="friend-bg" alt=""/>
                    <div className='friend-image flex'>
                        <img src={friend.profile_url} alt=""/>
                        <div className="friend-name">{friend.firstname} {friend.lastname}</div>
                    </div>

                    <div className='friend-header-overlay'/>
                </div>
                
                <div className='friend-preview'>
                    <div className='friend-bio'>
                        {friend.bio_content ?
                            <span>{friend.bio_content}</span>
                            :
                            <span>*No profile bio has been set for this user*</span>
                        }
                    </div>
                </div>

                <div className='profile-view flex'
                    onMouseOver={(e) => openView(friend._id, e)}
                    onMouseLeave={(e) => closeView(friend._id, e)}
                >   
                    <AiFillEye className='eye-icon'/>
                    <span>View Bio</span>
                </div>
            </div>
            <div className='friend-buttons grid'>
                <button className='chat-button flex' onClick={handleChat}>
                    Message
                </button>
                <button className='unfollow-button flex' onClick={() => {setModal(true)}}>
                    Unfollow
                </button>
            </div>
            <Modal isOpen={modal} style={modalStyles}>
                <h1 className='modal-text'>Are you sure you want to unfriend <span>{friend.firstname} {friend.lastname}</span>?</h1>
                <div className='modal-btns flex'>
                    <button className='cancel-btn' onClick={() => {setModal(false)}}>Cancel</button>
                    <button className="submit-btn" onClick={handleUnfriend}>Confirm</button> 
                </div>
            </Modal>
        </div>
    );
} 

export default FriendExtend;