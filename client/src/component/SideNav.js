import './styles/nav.css';
import { AiFillHome, AiFillRead, AiOutlineWechat } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { BsThreeDotsVertical, BsFilePersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFriends } from './actions/index.js';
import Modal from 'react-modal';
import Profile from './Profile.js';
import axios from 'axios';

const SideNav = () => {

    const modalStyles = {
        content : {
            inset : '50% auto auto 50%',
            width: 'max(25rem, 40%)',
            Height: '50%',
            paddingBottom: '3rem',
            transform: 'translate(-50%, -40%)', 
        },
        overlay: { zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const [user, setUser] = useState([]);
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem("isLogged")) {
            axios.post('/friends/', { user_id: JSON.parse(sessionStorage.getItem('user'))._id, })
            .then((response) => { dispatch(setFriends(response.data)); });
            setUser(JSON.parse(sessionStorage.getItem('user'))); 
        }
    }, [dispatch]);

    const handleClick = (event) => {
        let elements = document.querySelectorAll('.side-li:not(.logout)');
        elements.forEach(el => { el.classList.remove('active') });
        event.currentTarget.classList.add('active');
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    const closeModal = () => { setModal(false); }

    return (
        <div className="side-panel flex" style={{display: sessionStorage.getItem('isLogged') ? '' : 'none'}}>
            <div className="side-logo flex">
                <AiOutlineWechat className="logo-icon" style={{marginLeft: '5px'}} color="rgb(55, 243, 243)" size={36}/>
            </div>
            <Link to='/Dashboard' className="side-li flex" id="/Dashboard" onClick={handleClick}>
                <div>DASHBOARD</div>
                <AiFillHome className="side-icon"/>
            </Link>
            <Link to='/Friend' className="side-li flex" id="/Friend" onClick={handleClick}>
                <div>FRIENDS</div>
                <FaUserFriends className="side-icon"/>
            </Link>
            <Link to="/Search" className="side-li flex" id="/Search" onClick={handleClick}>
                <div>SEARCH</div>
                <BsSearch className="side-icon"/>
            </Link>
            <Link to="/About" className="side-li flex" id="/About" onClick={handleClick}>
                <div>ABOUT</div>
                <AiFillRead className="side-icon"/>
            </Link>
            <div className="side-li flex logout" onClick={logout}>
                <div>LOG OUT</div>
                <BiLogIn size={30}/>
            </div>    
            <div className="side-user flex">
                <img src={user.image_url} alt=""/>
                <div>{user.firstname} {user.lastname}</div>
                <BsThreeDotsVertical size={30} color="indigo"/>
                <div className='drop-li flex' onClick={() => setModal(true)}>
                    <BsFilePersonFill className='person-icon'/>
                    <div>Profile Info</div>
                </div>
            </div> 
            <Modal isOpen={modal} style={modalStyles}>
                <Profile user={user} closeModal={closeModal}/>
            </Modal>
    </div>
    );
}

export default SideNav;