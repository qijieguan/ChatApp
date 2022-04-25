import { MdPersonAdd } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';
import { AiFillRead } from 'react-icons/ai';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend } from './actions/index.js';
import { useEffect, useState } from 'react';

const User = ({ user }) => {

    const [status, setStatus] = useState(false);

    const friends = useSelector(state => state.friends);
    const dispatch = useDispatch();

    useEffect(() => { friends.forEach(friend_id => { if (friend_id === user._id) { setStatus(true); } });
    }, [friends, user._id]);

    const handleAdd = async () => {
        await axios.post('/friends/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: user._id
        }).then((response) => { dispatch(addFriend(response.data)); setStatus(true)});
    }

    const handleEnter = () => { document.getElementById(user._id).classList.add('focus'); }
    const handleLeave = () => { document.getElementById(user._id).classList.remove('focus'); }

    return (
        <div className="user-container">
            <div className='user'>
                <div className='user-bio-icon' 
                    style={{display: user.bio_content ? '' : 'none'}}
                    onMouseEnter={handleEnter} 
                    onMouseLeave={handleLeave}
                >
                    <AiFillRead size={26} color="orange"/>
                </div>
                <img className="user-image" src={user.image_url} alt=""/>
                <h1 className="user-name flex">
                    {user.firstname} {user.lastname} 
                    {JSON.parse(sessionStorage.getItem('user'))._id !== user._id ? 
                        <>
                            {!status ? 
                                <div className='user-add-1'>
                                    <MdPersonAdd color='yellow' size={26} onClick={handleAdd}/>
                                </div>
                                : <div className='user-add-2'><FiCheckCircle color="limegreen" size={24}/></div>
                            }
                        </> :''
                    }
                </h1>
                <div className='user-bio' id={user._id}>{user.bio_content}</div>
            </div>
        </div>
    );
}

export default User;