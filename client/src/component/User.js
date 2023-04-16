import { MdPersonAdd } from 'react-icons/md';
import { AiFillRead } from 'react-icons/ai';
import { HiCheckCircle } from 'react-icons/hi'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend } from './actions/index.js';
import { useEffect, useState } from 'react';

const User = ({ user }) => {

    const [isFriend, setFriend] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const friends = useSelector(state => state.friends);
    const dispatch = useDispatch();

    useEffect(() => { 
        friends.forEach(friend_id => { if (friend_id === user._id) { setFriend(true); 
        
    } });
    }, [friends, user._id]);

    const handleAdd = async () => {
        await axios.post(baseURL +'/friends/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: user._id
        }).then((response) => { dispatch(addFriend(response.data)); setFriend(true)});
    }

    const friendBorder = () => { return '2px solid green'; }

    const zoomIn = (e,userID) => {
        let element = document.getElementById(userID);
        element?.classList.add('active');

        element.querySelector('.user-bio-icon')?.classList.add('shift');
    }    

    const zoomOut = (e, userID) => {
        let element = document.getElementById(userID);
        element?.classList.remove('active');

        element.querySelector('.user-bio-icon')?.classList.remove('shift'); 
    }

    const zoomInverse = (e, userID) => {
        let element = document.getElementById(userID);
        if (element?.classList.contains('active')) { zoomOut(e, userID) }
        else { zoomIn(e, userID) }    
    }
 
    const readBio = (e, userID) => {
        zoomIn(e, userID);
    }   

    return (
        <div className="user-container">
            <div className='user' id={user._id} style={{border: isFriend ? friendBorder() : 'none' }}
                onMouseOver={(e) => zoomIn(e, user._id)}
                onMouseLeave={(e) => zoomOut(e, user._id)}
                onClick={(e) => zoomInverse(e, user._id)}
            >
                <div className='user-bio-icon' 
                    style={{display: user.bio_content ? '' : 'none'}}
                >
                    <AiFillRead size={26} color="orange"
                        onClick={(e) => readBio(e, user._id) }
                    />
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
                                <div className='user-icon-1'>
                                    <MdPersonAdd color='yellowgreen' size={26} onClick={handleAdd}/>
                                </div>
                                : <div className='user-icon-2'><HiCheckCircle color="gold" size={24}/></div>
                            }
                        </> :''
                    }
                </h1>
            </div>
        </div>
    );
}

export default User;