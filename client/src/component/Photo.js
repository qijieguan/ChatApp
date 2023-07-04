import './styles/photo.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Photo = ({photo, photoID, render}) => {

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
            width: 'min(90vw, 40rem)',
            maxHeight: '100%',
            transform: 'translate(-50%, -50%)', 
            color: 'gray',
            backgroundColor: 'white',
            border: '1px solid rgb(180, 180, 180)',
        },
        overlay: {  backgroundColor: 'rgb(230, 230, 230, 0.7)', zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));


    var user = JSON.parse(sessionStorage.getItem('user'));
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

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
        await axios.post(baseURL +'/users/change_profile', { user_id: user._id, url: src });
        user.profile_url = src;
        sessionStorage.setItem('user', JSON.stringify(user));
        setSRC("");
        return render();
    }

    const changeBackground = async (e) => {
        e.preventDefault();
        if (!src) { return; }
        user.background_url = src;
        await axios.post(baseURL +'/users/change_background', { user_id: user._id, url: src });
        sessionStorage.setItem('user', JSON.stringify(user));
        setSRC("");
        return render();
    }

    return (
        <div className='photo-wrapper checkbox' onClick={handleClick}>
            <img src={photo} alt=""/>
            <Modal isOpen={modal} style={modalStyles}>
                <AiOutlineCloseCircle className='close-button' onClick={() => {setModal(false); }}/>
                <img className="zoom-photo" src={photo} alt=""/>
                <button className='set-button profile' onClick={changeProfile}>Set as profile</button>
                <button className='set-button background' onClick={changeBackground}>Set as background</button>
            </Modal>
        </div>
    )
}

export default Photo;