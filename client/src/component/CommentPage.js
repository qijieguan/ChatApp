import './styles/comment-page.css';
import { AiOutlineCamera, AiOutlineSend, AiOutlineArrowLeft, AiFillLike } from 'react-icons/ai';
import { FaCat } from 'react-icons/fa';
import { BsFillShareFill } from 'react-icons/bs';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

const CommentPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [likes, setLikes] = useState([]);
    const [posterID, setPosterID] = useState("");
    const [poster_name, setName] = useState("");
    const [poster_profile, setProfile] = useState("");
    const [post, setPost] = useState("");
    const [postID, setPostID] = useState("");

    const [commentArr, setCommentArr] = useState([]);
    const [commentInp, setCommentInp] = useState("");

    const user = JSON.parse(sessionStorage.getItem('user'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {  
        if (location.state && location.state.post) { 
            setAllStates(); 
        } 
    },[location]);

    window.addEventListener('resize', () => { handleResize(); });

    const handleResize = () => {
        let app = document?.querySelector('.App');
        let menu = document?.querySelector('.menu');
        let comment_nav = document?.querySelector('.comment-nav');
        
        if (app.offsetWidth <= 960 && comment_nav) { comment_nav.style.top = menu.offsetHeight + 'px'; }
        if (app.offsetWidth > 960 && comment_nav) { comment_nav.style.top = '0'; }
    }

    const highlightLikes = (likesArr) => {
        let match = likesArr.filter(id => id === user._id);
        let post_id = location.state.post._id;

        if (match.length > 0) {
            document.getElementById(post_id)?.querySelector('.post-footer>.post-like')?.classList.add('active');
        }
        else {
            document.getElementById(post_id)?.querySelector('.post-footer>.post-like')?.classList.remove('active');
        }
    }

    const setAllStates = () => {
        setPosterID(location.state.poster_id);
        setName(location.state.poster_name);
        setProfile(location.state.poster_profile);
        setPost(location.state.post);
        setPostID(location.state.post._id);
        setLikes(location.state.post.likes);
        setCommentArr(location.state.post.comments);

        setTimeout(() => { highlightLikes(location.state.post.likes); });
    }

    const handleChange = (event) => { setCommentInp(event.target.value); }
    
    const submitComment = async (event) => {
        event.preventDefault();

        if (!commentInp.length) { return; }

        const comment = {
            user_profile: user.profile_url,
            user_name: user.firstname + " " + user.lastname,
            comment: commentInp,
            replies: []
        }

        await axios.post(baseURL + '/' + location.state.route + '/post-comment/', {
            community_id: location.state.community_id,
            poster_id: posterID,
            post_id: postID,
            comment: comment
        });
      
        setCommentArr([...commentArr, comment]);
        setCommentInp('');
    }

    const handleNav = () => {      
        if (location.state.route.includes('user-post')) {
            navigate("/Dashboard/Post", {state: {postID: post._id}}, {replace: true});
        }
        else {
            navigate("/Dashboard/Community/" + location.state.community_name, 
                {state: {communityID: location.state.community_id, postID: post._id}}, 
            {replace: true});
        }
    }
   
    const toggleLike = async (event) => {
        let match = likes.filter(id => id === user._id);
        let result;   

        if (match.length > 0) { result = likes.filter(id => id !== user._id); }
        else { result = [...likes, user._id]; }

        let updatedPost = location.state.post;
        post.likes = result;
        setLikes(result);
        highlightLikes(result);

        await axios.post(baseURL + '/' + location.state.route + '/update-likes/', { 
            community_id: location.state.community_id,
            poster_id: posterID,
            post_id: postID,
            likes: result
        });
        
        navigate({} , 
        {state:{
            community_id: location.state.community_id,
            community_name: location.state.community_name,
            poster_id: location.state.poster_id,
            poster_name: location.state.poster_name, 
            poster_profile: location.state.poster_profile, 
            post: updatedPost,
            route: location.state.route
        }});
    }

    return (
        <div className='comment-page flex' onLoad={handleResize}>
            <div className='comment-nav flex'>
                <div to="/Dashboard/Post" className='comment-nav-link flex' onClick={() => {handleNav(postID)}}>
                    <AiOutlineArrowLeft className='comment-nav-icon'/>
                    <span className='comment-nav-text'>Close comment view</span>
                </div>
            </div>
            
            <div className='primary-post flex' id={post._id}>
                <div className='primary-user flex'>
                    <img className='poster-image' src={poster_profile} alt=""/>
                    <h1 className='poster-name'>{poster_name}</h1>
                </div>

                {post.primary_text && post.primary_text.length && <div className='primary-text'>{post.primary_text}</div>}
                {post.primary_image && post.primary_image.length && <img className='primary-image' src={post.primary_image} alt=''/>}
                <div className='post-footer flex'>
                    <div className='post-like action flex' onClick={toggleLike}>
                        <AiFillLike className='post-icon'/>
                        <span>Like</span>
                        {likes.length > 0 &&
                            <div className='like-count count flex'>{likes.length}</div>
                        }
                    </div>
                    
                    <div className='post-share action flex'>
                            <BsFillShareFill className='post-icon' style={{fontSize: 'clamp(0.875rem, 1vw, 1rem)'}}/>
                            <span>Share</span>
                        </div>
                </div>
            </div>

            <hr className='comment-hr'/>

            <div className='comment-input-wrapper flex'>
                <div className='comment-label'>Comment</div>
                <img src={user.profile_url} alt=""/>
                <div className='comment-input flex'>
                    <input
                        placeholder="What's on your mind?"
                        value={commentInp}
                        onChange={handleChange}
                    />
                    <div className='comment-input-icons flex'>
                        <div className='comment-camera flex'>
                            <AiOutlineCamera className='comment-camera-icon'/>
                        </div>

                        <div className='comment-send flex'>
                            <div className='comment-send-wrapper flex' onClick={submitComment}>
                                <AiOutlineSend className='comment-send-icon'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='comment-collection flex'>
                {commentArr && commentArr.length ?
                    commentArr.map(comment => 
                        <div className='comment flex' key={comment._id}>
                            <div className='comment-profile flex'>
                                <img src={comment.user_profile} alt=""/>
                                <span className='comment-name'>{comment.user_name}</span> 
                            </div>
                            <div className='comment-text'>
                                <span className='comment-content'>{comment.comment}</span>
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