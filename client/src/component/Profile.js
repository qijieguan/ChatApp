import './styles/profile.css';
import { useState, useEffect } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import SideNav from './SideNav.js';
import Album from './Album.js';
import axios from 'axios';

const Profile = () => {

    const user = JSON.parse(sessionStorage.getItem('user'))
    const [bio, setBio] = useState(user.bio_content);
    const [isEdit, setIsEdit] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {}, [reload]);

    const handleChange = (e) => { setBio(e.target.value); }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/users/edit_bio/', {user_id: user._id, bio_content: bio});
        user.bio_content = bio;
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsEdit(false);
        setReload(!reload);
    }

    return(
        <>
            <SideNav/>
            <div className="profile grid">
                <div className='profile-section flex'>
                    <img src={user.image_url} className="profile-image" alt=""/>
                    <div className='profile-line flex'>
                        <div className='p-line'/>
                        <div className='profile-name'>{user.firstname} {user.lastname}</div>
                    </div>
                    <div className='profile-bio'>
                        <h1 className='bio-label'>Personal Bio</h1>
                        <h1 className='bio-body flex' style={{display: !isEdit ? '' : 'none'}}>
                            <div className='bio-content'>
                                { !bio.length ? <span>Write a public bio for display</span> : bio }
                            </div>
                            <button className='edit-btn flex' onClick={() => setIsEdit(true)}>
                                <AiTwotoneEdit style={{marginRight: '0.25rem'}}/> Edit
                            </button>
                        </h1>
                        <textarea placeholder='Add/Edit your profile here...'
                            className='flex' 
                            style={{display: isEdit ? '' : 'none'}}
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
                <Album user={user}/>
            </div>
        </>
    )
}

export default Profile;