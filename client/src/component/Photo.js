import './styles/photo.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Photo = ({photo, photoID, userID, user, render}) => {

    const modalStyles = {
        content : {
            padding: '0 0 5vh 0',
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
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'white',
            border: '1px solid rgb(180, 180, 180)',
        },
        overlay: {  backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const navigate = useNavigate();

    const [src, setSRC] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {}, [photoID]);


    const handleClick = (e) => {
        if (!modal) {
            setModal(true);
            setSRC(e.currentTarget.childNodes[0].src);
        }
    }

    const changeProfile = async (e) => {
        e.preventDefault();
        if (!src) { return; }
        await axios.post(baseURL +'/users/change_profile', { user_id: userID, url: src });
        user.profile_url = src;
        if (JSON.parse(sessionStorage.getItem('user'))._id === userID) {
            sessionStorage.setItem('user', JSON.stringify(user));
            setSRC("");
            return render();
        }
        else {
            navigate(`/Dashboard/Profile/${user.firstname}_${user.lastname}`, {state: {user: user}});
        }
    }

    const changeBackground = async (e) => {
        e.preventDefault();
        if (!src) { return; }
        user.background_url = src;
        await axios.post(baseURL +'/users/change_background', { user_id: userID, url: src });
        if (JSON.parse(sessionStorage.getItem('user'))._id === userID) {
            sessionStorage.setItem('user', JSON.stringify(user));
            setSRC("");
            return render();
        }
        else {
            navigate(`/Dashboard/Profile/${user.firstname}_${user.lastname}`, {state: {user: user}});
        }
    }

    return (
        <div className='photo-wrapper checkbox' onClick={handleClick}>
            <img src={photo} alt=""/>
          
            <Modal isOpen={modal} style={modalStyles}>
                <AiOutlineCloseCircle className='close-button' onClick={() => {setModal(false);}}/>
                <img className="zoom-photo" src={photo} alt=""/>
                <button className='set-button profile' onClick={changeProfile}>Set as profile</button>
                <button className='set-button background' onClick={changeBackground}>Set as background</button>
            </Modal>
            
        </div>
    )
}

export default Photo;