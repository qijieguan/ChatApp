import { MdPersonAdd } from 'react-icons/md';
import { AiFillRead } from 'react-icons/ai';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend } from './actions/index.js';
import { useEffect, useState } from 'react';

const User = ({ user }) => {

    const [isFriend, setFriend] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const friends = useSelector(state => state.friends);
    const dispatch = useDispatch();

    useEffect(() => { 
        friends.forEach(friend_id => { if (friend_id === user._id) { setFriend(true); } });

        document.getElementById(user._id)?.addEventListener('touchstart' , (event) => {
            setIsMobile(true);
        });
        
    }, [friends, user._id]);

    const handleAdd = async () => {
        await axios.post(baseURL +'/friends/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: user._id
        }).then((response) => { dispatch(addFriend(response.data)); setFriend(true)});
    }

    const zoomIn = (e, userID) => {
        let element = document.getElementById(userID);
        element?.classList.add('active');
    }    

    const zoomOut = (e, userID) => {
        let element = document.getElementById(userID);
        element?.classList.remove('active');
    }

    const toggleZoom = (e, userID) => {
        let element = document.getElementById(userID);
        
        if (element?.classList.contains('active')) { zoomOut(e, userID) }
        else { zoomIn(e, userID) } 
    }

    const openBio = (e, userID) => {
        e.stopPropagation();
        let element = document.getElementById(userID)

        element?.classList.add('active');
        element?.querySelector('.user-bio-icon')?.classList.add('shift');
    }

    const closeBio = (e, userID) => {
        let element = document.getElementById(userID).querySelector('.user-bio-icon');
        element?.classList.remove('shift');
    }

    const toggleBio = (e, userID) => {
        e.stopPropagation();

        let element = document.getElementById(userID).querySelector('.user-bio-icon');
        if (element?.classList.contains('shift')) {
            element?.classList.remove('shift')
        }
        else { openBio(e, userID); }
    }

    return (
        <div className="user-container">
            <div className='user' id={user._id}
                onClick={(e) => { toggleZoom(e, user._id); }} 
                onMouseEnter={(e) => { if (!isMobile) { zoomIn(e, user._id); } }}
                onMouseLeave={(e) => { zoomOut(e, user._id); }}
            >
                <div className='user-bio-icon' style={{display: user.bio_content ? '' : 'none'}}
                    onClick={(e) => { toggleBio(e, user._id) } }
                    onMouseEnter={(e) => { if (!isMobile) { openBio(e, user._id); } }}
                    onMouseLeave={(e) => { closeBio(e, user._id); }}
                >
                    <AiFillRead size={26} color="orange"/>
                </div>
                <div className='user-bio flex'>
                    <span>{user.bio_content}</span>
                </div>
                <img className="user-image" src={user.profile_url} alt=""/>
                <h1 className="user-name flex">
                    <span>{user.firstname} {user.lastname} </span>
                    {JSON.parse(sessionStorage.getItem('user'))._id !== user._id ? 
                        <>
                            {!isFriend ? 
                                <div className='user-icon-1 flex'>
                                    <MdPersonAdd color='rgb(180, 180, 180)' size={26} onClick={handleAdd}/>
                                </div>
                                : <div className='user-icon-2 flex'><BsFillPatchCheckFill color="yellowgreen" size={24}/></div>
                            }
                        </> :''
                    }
                </h1>
            </div>
        </div>
    );
}

export default User;