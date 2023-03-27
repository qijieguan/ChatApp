import { RiCloseCircleFill } from 'react-icons/ri';
import  { BsFillChatDotsFill } from 'react-icons/bs';
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

    const calcOffset = (e) => {
        let el = document.querySelector('.friend');
        let calc = e.pageX / window.innerWidth;

        if (calc <= 0.5) { el.querySelector('.friend-preview')?.classList.add('left'); }
        else { el.querySelector('.friend-preview')?.classList.remove('left'); }
    }

    return (
        <div className="friend flex" onMouseEnter={calcOffset}>
            <img src={friend.image_url} className="friend-image" alt=""/>
            <div className="friend-name">{friend.firstname} {friend.lastname}</div>
            <div className='profile-view'>(view profile)</div>
            
            <div className='friend-preview'>
                <div className='friend-bio' id={friend._id}>
                    {friend.bio_content ?
                        <span>{friend.bio_content}</span>
                        :
                        <span>(No profile has been set for this user)</span>
                    }
                </div>
                <div className='friend-buttons grid'>
                    <button className='chat-button flex' onClick={handleChat}>
                        Message
                    </button>
                    <button className='remove-button flex' onClick={() => {setModal(true)}}>
                        Remove
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
        </div>
    );
} 

export default Extend;