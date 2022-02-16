import { MdPersonAdd } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';
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
        await axios.post('http://localhost:3001/friends/add/', {
            user_id: JSON.parse(sessionStorage.getItem('user'))._id, 
            friend_id: user._id
        }).then((response) => { dispatch(addFriend(response.data)); setStatus(true)});
    }

    return (
        <div id="user-container">
            <div id='user' 
                style={{boxShadow: JSON.parse(sessionStorage.getItem('user'))._id === user._id ? '0 0 10px 5px green' : '' }}
            >
                <img id="user-image" src={user.image_url} alt=""/>
                <h1 id="user-name">
                    {user.firstname} {user.lastname} 
                    {JSON.parse(sessionStorage.getItem('user'))._id !== user._id ? 
                        <>
                            {!status ? 
                                <div id='user-add-1'>
                                    <MdPersonAdd color='orange' onClick={handleAdd}/>
                                </div>
                                :
                                <div id='user-add-2'> <FiCheckCircle color="limegreen"/> </div>
                            }
                        </>
                        :''
                    }
                </h1>
            </div>
        </div>
    );
}

export default User;