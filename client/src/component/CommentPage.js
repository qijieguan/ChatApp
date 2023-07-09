import './styles/comment-page.css';
import { AiOutlineDown, AiOutlineCamera, AiOutlineSend, AiOutlineArrowLeft } from 'react-icons/ai';
import { FaCat } from 'react-icons/fa';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation, Link, useNavigate } from 'react-router-dom';

const CommentPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [poster_name, setName] = useState("");
    const [poster_profile, setProfile] = useState("");
    const [post, setPost] = useState("");
    const [postID, setPostID] = useState("");
    const [posterID, setPosterID] = useState("");

    const [commentArr, setCommentArr] = useState([]);
    const [commentInp, setCommentInp] = useState("");

    const user = JSON.parse(sessionStorage.getItem('user'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {  
        if (location.state && location.state.post) {
            setName(location.state.poster_name);
            setProfile(location.state.poster_profile);
            setPost(location.state.post);
            setPostID(location.state.post._id);
            setPosterID(location.state.post.poster_id);
            setCommentArr(location.state.post.comments);
        } 
        
        handleResize();
        console.log('refresh')

        window.addEventListener('resize', () => {
            handleResize();
        })
    },[location]);

    const handleResize = () => {
        let app = document.querySelector('.App');
        let menu = document.querySelector('.menu');
        let comment_nav = document.querySelector('.comment-nav');
        
        if (app.offsetWidth <= 960) {
            comment_nav.style.top = menu.offsetHeight + 'px';
        }
        else {
            comment_nav.style.top = '0';
        }
    }

    const handleChange = (event) => {
        setCommentInp(event.target.value);
    }
    
    const handleClick = async (event) => {
        event.preventDefault();

        if (!commentInp.length) { return; }

        const comment = {
            user_profile: user.profile_url,
            user_name: user.firstname + " " + user.lastname,
            comment: commentInp,
            replies: []
        }

        await axios.post(baseURL +'/posts/post-comment', {
            poster_id: posterID,
            post_id: postID,
            comment: comment
        })
        .then((response) => {});

        setCommentArr([...commentArr, comment]);
        setCommentInp('');
    }

    const handleNav = () => {
        console.log(postID)

        if (postID.length) {
            sessionStorage.setItem('scroll_to_post', JSON.stringify(postID));

            navigate(
                "/Dashboard/Post",
                {replace: true}
            );
        }
    }

    return (
        <div className='comment-page flex'>
            <div className='comment-nav flex'>
                <div to="/Dashboard/Post" className='comment-nav-link flex' onClick={() => {handleNav(postID)}}>
                    <AiOutlineArrowLeft className='comment-nav-icon'/>
                    <span className='comment-nav-text'>Close comment view</span>
                </div>
            </div>
            
            <div className='primary-post flex'>
                <div className='primary-user flex'>
                    <img className='poster-image' src={poster_profile} alt=""/>
                    <h1 className='poster-name' style={{color: 'crimson'}}>{poster_name}</h1>
                </div>

                {post.primary_text && post.primary_text.length && <div className='primary-text'>{post.primary_text}</div>}
                {post.primary_image && post.primary_image.length && <img className='primary-image' src={post.primary_image} alt=''/>}
            </div>

            <div className='comment-input-wrapper flex'>
                <img src={user.profile_url} alt=""/>
                <div className='comment-input flex'>
                    <input
                        placeholder="What's on your mind?"
                        value={commentInp}
                        onChange={handleChange}
                    />
                    <div className='comment-camera flex'>
                        <AiOutlineCamera className='comment-camera-icon'/>
                    </div>

                    <div className='comment-send flex'>
                        <div className='comment-send-wrapper flex' onClick={handleClick}>
                            <AiOutlineSend className='comment-send-icon'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='comment-label flex'>
                <span>All Comments</span>
                <AiOutlineDown className='comment-down-icon'/>
            </div>

            <div className='comment-collection flex'>
                {commentArr && commentArr.length ?
                    commentArr.map(c => 
                        <div className='comment flex' key={c._id}>
                            <div className='comment-profile flex'>
                                <img src={c.user_profile} alt=""/>
                                <span className='comment-name'>{c.user_name}</span> 
                            </div>
                            <div className='comment-text'>
                                <span className='comment-content'>{c.comment}</span>
                            </div>
                        </div>    
                    )
                    :
                    <div className='comment-empty flex'>
                        <span>Wow. Much Empty</span>
                        <FaCat className='cat-icon'/>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentPage;