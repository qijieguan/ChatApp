import './styles/profile.css';
import { useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import Menu from './Menu.js';
import Album from './Album.js';
import FriendCount from './FriendCount.js';
import axios from 'axios';

const Profile = () => {

    var user = JSON.parse(sessionStorage.getItem('user'));
    const [bio, setBio] = useState(user.bio_content);
    const [isEdit, setIsEdit] = useState(false);
    const [render, setRender] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const handleChange = (e) => { setBio(e.target.value); }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(baseURL +'/users/edit_bio/', {user_id: user._id, bio_content: bio});
        user.bio_content = bio;
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsEdit(false);
        setRender(!render);
    }
    
    const callRender = () => { setRender(!render) }

    return(
        <>
            <Menu/>
            <div className="profile flex">
                <div className='profile-header flex'>
                    <img src={user.image_url} className="profile-image" alt=""/>
                    <div className='profile-name'>{user.firstname} {user.lastname}</div>
                    
                    <div className='profile-bio flex'>
                        <h1 className='bio-label'>Personal Bio</h1>
                        <h1 className='bio-body flex' style={{display: !isEdit ? '' : 'none'}}>
                            <div className='bio-content'>
                                { !bio.length ? <span>Write a public bio for display</span> : bio }
                            </div>
                            <button className='edit-btn flex' onClick={() => setIsEdit(true)}>
                                <AiTwotoneEdit style={{marginRight: '0.25rem'}}/> Edit
                            </button>
                        </h1>
                        <div className='bio-edit flex' style={{display: isEdit ? '' : 'none'}}>
                            <textarea placeholder='Add/Edit your profile here...' 
                                value={bio}
                                onChange={handleChange}
                            />
                            {isEdit ?
                                <div className='flex'>
                                    <button className='cancel-button' onClick={()=>{setIsEdit(false)}}>CANCEL</button>
                                    <button className='submit-button' onClick={handleSubmit}>SUBMIT</button>
                                </div> : ''
                            }
                        </div>
                    </div>
                </div>
                <Album callRender={callRender}/>
                <FriendCount/>
            </div>
        </>
    )
}

export default Profile;