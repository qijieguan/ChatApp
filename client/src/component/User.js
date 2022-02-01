import { MdPersonAdd } from 'react-icons/md';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFriend } from './actions/index.js';
import { useEffect, useState } from 'react';

const User = ({ user }) => {

    const [status, setStatus] = useState(false);

    const friends = useSelector(state => state.friends);
    const dispatch = useDispatch();

    useEffect(() => {
        friends.forEach(friend_id => { if (friend_id === user._id) { setStatus(true); } });
    }, [friends, user._id]);

    const handleAdd = () => {
        axios.post('http://localhost:3001/friends/add/', {
            user_id: JSON.parse(localStorage.getItem('user'))._id,
            friend_id: user._id
        }).then((response) => { dispatch(addFriend(response.data)); setStatus(true)});
    }

    return (
        <div className="user-container">
            <div className='user' 
                style={{boxShadow: JSON.parse(localStorage.getItem('user'))._id === user._id ? '0 0 10px 5px green' : '' }}
            >
                <img className="user-image" src={user.image_url} alt=""/>
                <h1 className="user-name">
                    {user.firstname} {user.lastname} 
                    {JSON.parse(localStorage.getItem('user'))._id !== user._id ? 
                        <>
                            {!status ?
                                <MdPersonAdd className='user-add' color='orange' onClick={handleAdd}/>
                                :
                                <BsFillPersonCheckFill className='user-add' color="limegreen"/> 
                            }
                        </> : ''
                    }
                </h1>
            </div>
        </div>
    );
}

export default User;