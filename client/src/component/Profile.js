import './styles/profile.css';
import { useState, useEffect } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';

import Album from './Album.js';
import FriendCount from './FriendCount.js';
import axios from 'axios';

const Profile = () => {

    var user = JSON.parse(sessionStorage.getItem('user'));
    const [bio, setBio] = useState(user.bio_content);
    const [isEdit, setIsEdit] = useState(false);
    const [followCount, setFollowCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [render, setRender] = useState(false);
    const [toggle, setToggle] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { 
        getPostCount(); 
        getFollowCount(); 
    }, []);

    const getPostCount = async () => {
        await axios.post(baseURL + '/posts/count/', {poster_id: user._id})
        .then(response => { 
            setPostCount(response.data.length); 
        });
    }

    const getFollowCount = async () => {
        await axios.post(baseURL + '/friends/count/', {user_id: user._id})
        .then(response => { 
            setFollowCount(response.data); 
        });
    }

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

    const toggleSwitch = (event) => {

        document.querySelector('.media-nav-li.highlight')?.classList.remove('highlight');
        event.target?.classList.add('highlight');

        setToggle(!toggle);
    }

    return(
        <div className="profile flex">
            {user.firstname &&
                <section className='profile-banner flex'>
                    <div className='profile-top flex'>
                        <img src={user.background_url} className="profile-background" alt=""/>
                    </div>
                    <div className='profile-bottom flex'>
                        <div className='profile-label flex'>
                            <img src={user.profile_url} className="profile-image" alt=""/>
                            <div className='profile-name'>{user.firstname + " " + user.lastname}</div>

                            <div className='profile-footer flex'>   
                                <div className='flex'>
                                    <span>Posts</span>
                                    <h1>{postCount}</h1>
                                </div>
                                <div className='flex'>
                                    <span>Following</span>
                                    <h1>{followCount}</h1>
                                </div>
                            </div>
                        </div>
                        <div className='profile-bio flex'>
                            <h1 className='bio-body flex' style={{display: isEdit && 'none'}}>
                                <div className='bio-content'>
                                    { !bio.length ? <span>Tell a little bit about yourself to everyone</span> : bio }
                                </div>
                                <button className='edit-btn flex' onClick={() => setIsEdit(true)}>
                                    <AiTwotoneEdit style={{marginRight: '0.25rem'}}/> Write
                                </button>
                            </h1>
                            <div className='bio-edit flex' style={{display: !isEdit && 'none'}}>
                                <textarea placeholder='Type your thoughts here...' 
                                    value={bio}
                                    onChange={handleChange}
                                />
                                {isEdit &&
                                    <div className='flex'>
                                        <button className='cancel-button' onClick={()=>{setIsEdit(false)}}>CANCEL</button>
                                        <button className='submit-button' onClick={handleSubmit}>SUBMIT</button>
                                    </div> 
                                }
                            </div>
                        </div>
                    </div>
                </section>
                }
                <section className='profile-media'>
                    <div className='media-nav flex'>
                        <div className='media-nav-li highlight' onClick={toggleSwitch}>Photo</div>
                        <div className='media-nav-li' onClick={toggleSwitch}>Following</div>
                    </div>
                    {!toggle ?
                        <Album callRender={callRender}/>
                        :
                        <FriendCount/>
                    }
                </section>
        </div> 
    )
}

export default Profile;