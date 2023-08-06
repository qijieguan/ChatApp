import './styles/comment-page.css';
import { AiOutlineCamera, AiOutlineSend, AiOutlineArrowLeft, AiFillLike } from 'react-icons/ai';
import { FaCat } from 'react-icons/fa';
import { BsFillShareFill, BsSearch } from 'react-icons/bs';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import { useLocation, useNavigate } from 'react-router-dom';

const CommentPage = () => {

    const modalStyles = {
        content : {
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            justifyContent: 'center',
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            textAlign: 'center',
            width: 'min(92.5vw, 70rem)',
            maxHeight: '85%',
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'rgb(249, 249, 255)',
            border: '1px solid black',
        },
        overlay: { backgroundColor: 'rgb(0, 0, 0, 0.7)', zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const location = useLocation();
    const navigate = useNavigate();

    const [likes, setLikes] = useState([]);
    const [posterID, setPosterID] = useState("");
    const [poster_name, setName] = useState("");
    const [poster_profile, setProfile] = useState("");
    const [post, setPost] = useState("");
    const [postID, setPostID] = useState("");
    const [timeStamp, setTimeStamp] = useState("");

    const [commentArr, setCommentArr] = useState([]);
    const [commentInp, setCommentInp] = useState("");

    const [zoomImage, setZoomImage] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {  
        if (location.state && location.state.post_id) { 
            setAllStates(); 
        } 
    },[location]);

    const parseStringTime = (timeStamp) => {
        if (!timeStamp) { return null; }
        let [Y, M, D, H, m, s] = timeStamp.split(/\D/);
        let date = new Date(Date.UTC(Y, M-1, D, H, m, s));
    
        let local_date = date.toLocaleString('default', { 
            //weekday: "long",
            year: "numeric", 
            month: "short", 
            day: "numeric", 
            hour: '2-digit', 
            minute:'2-digit' 
        });

        let result = local_date.split(', ')
        
        return result[0] + " · " + result[2];
    }

    const highlightLikes = (likesArr) => {
        let match = likesArr.filter(id => id === user._id);
        let post_id = location.state.post_id;

        if (match.length > 0 && post_id) {
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
        setPostID(location.state.post_id);
        setTimeStamp(location.state.timeStamp);
        
        getPostData();
    }

    const getPostData = async () => {
        await axios.post(baseURL + '/' + location.state.route + '/get-data/', {
            post_id: location.state.post_id,
        })
        .then((response) => {
            setPost(response.data.post);

            if (response.data.post) { 
                setCommentArr(response.data.post.comments.reverse()); 
                setLikes(response.data.post.likes);
                setTimeout(() => { highlightLikes(response.data.post.likes); });
            }
            else { 
                setPost({primary_text: response.data.primary_text, primary_image: response.data.primary_image});
                setCommentArr(response.data.comments.reverse());
                setLikes(response.data.likes);
                setTimeout(() => { highlightLikes(response.data.likes); });
            }
        });
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
      
        setCommentInp('');
        getPostData();
    }

    const handleNav = () => {      
        if (location.state.route.includes('user-post')) {
            navigate("/Dashboard/Post", {state: {postID: postID}}, {replace: true});
        }
        else {
            navigate("/Dashboard/Community/" + location.state.community_name, 
                {state: {
                    communityID: location.state.community_id, 
                    communityName: location.state.community_name, 
                    postID: postID
                }}, 
            {replace: true});
        }
    }
   
    const toggleLike = async (event) => {
        let match = likes.filter(id => id === user._id);
        let result;   

        if (match.length > 0) { result = likes.filter(id => id !== user._id); }
        else { result = [...likes, user._id]; }
        
        setLikes(result);
        highlightLikes(result);

        await axios.post(baseURL + '/' + location.state.route + '/update-likes/', { 
            community_id: location.state.community_id,
            poster_id: posterID,
            post_id: postID,
            likes: result
        });
    }

    return (
        <div className='comment-page flex'>
            <div className='comment-nav flex'>
                <div to="/Dashboard/Post" className='comment-nav-link flex' onClick={() => {handleNav(postID)}}>
                    <AiOutlineArrowLeft className='comment-nav-icon'/>
                    <div className='comment-nav-text'>
                        {location.state && location.state.community_name ?
                            <span>R/ {location.state.community_name}</span>
                            :
                            <span>Go Back</span>
                        }
                    </div>
                </div>
            </div>
            
            <div className='primary-post flex'id={postID}>
                <div className='primary-user flex'>
                    <img className='poster-image' src={poster_profile} alt=""/>
                    <h1 className='poster-name'>{poster_name}</h1>
                    <div className='post-time'>{timeStamp}</div>
                </div>

                {post && post.primary_text && post.primary_text.length && 
                    <div className='primary-text'>{post.primary_text}</div>
                }
                {post && post.primary_image && post.primary_image.length && 
                    <div className='primary-image-wrapper'>
                        <img src={post.primary_image} className='primary-image' alt=""/>
                        <div className='image-zoom-icon-wrapper flex' onClick={() => { setZoomImage(true); }}>
                            <BsSearch className='image-zoom-icon'/>
                        </div>

                        <Modal isOpen={zoomImage} style={modalStyles}>
                            <div className='primary-image-zoom'>
                                <img src={post.primary_image} alt=""/>
                                <button onClick={() => { setZoomImage(false); }}>Exit View</button>
                            </div>
                        </Modal>
                    </div>  
                }
                <div className='post-footer flex'>
                    <div className='post-like action flex' onClick={toggleLike}>
                        <AiFillLike className='post-icon'/>
                        <span>Like</span>
                        {likes && likes.length > 0 &&
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
                            <div className='post-time'>{parseStringTime(comment.updatedAt)}</div>
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