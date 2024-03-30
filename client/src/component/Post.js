import './styles/post.css';
import { BsTrash, BsFillShareFill, BsSearch } from 'react-icons/bs';
import { BiCommentMinus } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Post = ({post, post_id, poster_id, poster_profile, poster_name, timeStamp, deletePost}) => {

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

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likes);
    const [commentCount, setComment] = useState(post.comments.length);
    const [zoomImage, setZoomImage] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { 
        highlightLikes(); 
    }, [likes]);

    const parseStringTime = () => {
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

        let result = local_date.split(', ');
        
        return result[0] + " at " + result[2];
    }

    const highlightLikes = () => {
        
        let match = likes.filter(id => id === user._id);

        if (match.length > 0) {
            document.getElementById(post_id)?.querySelector('.post-footer>.post-like')?.classList.add('active');
        }
        else {
            document.getElementById(post_id)?.querySelector('.post-footer>.post-like')?.classList.remove('active');
        }
    }

    const toggleLike = async (event) => {
        let result;
        
        if (!event.currentTarget.className.includes('active')) { result = [...likes, user._id];}
        else { result = likes.filter(id => id !== user._id); }

        await axios.post(baseURL + '/posts/user-post/update-likes/', { 
            post_id: post_id,
            likes: result
        });

        post.likes = result;
        setLikes(result);
    }

    const viewComment = () => {
        navigate(
            "/Dashboard/User_Post/" + post_id + "/Comment",
            {state: {
                poster_id: poster_id, 
                poster_name: poster_name,
                poster_profile: poster_profile, 
                post_id: post_id,
                timeStamp: parseStringTime(),
                route: 'posts/user-post'
            }},
            {replace: true}
        );
    }

    return (
        <div style={{width: '100%'}}> 
            { post &&
                <div className='post flex' id={post_id}>
                    <div className='post-header flex'>
                        <img className='poster-image' src={poster_profile} alt=""></img>
                        <div className='poster-name'>{poster_name} </div>
                        <div className="post-time flex"> {parseStringTime()} </div>
                    </div>
                    {post.primary_image &&
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
                    <div className='primary-text'>{post.primary_text}</div>
    
                    <div className='post-footer flex'>
                        <div className='post-like action flex' onClick={toggleLike}>
                            <AiFillLike className='post-icon'/>
                            <span>Like</span>
                            {likes.length > 0 &&
                                <div className='like-count count flex'>{likes.length}</div>
                            }
                        </div>
        
                        <div 
                            onClick={viewComment}
                            className='post-comment action flex'>
                            <BiCommentMinus className='post-icon'/>
                            <span>Comment</span>
                            {commentCount > 0 &&
                                <div className='comment-count count flex'>{commentCount}</div>
                            }
                        </div>
        
                        <div className='post-share action flex'>
                            <BsFillShareFill className='post-icon' style={{fontSize: 'clamp(0.875rem, 1vw, 1rem)'}}/>
                            <span>Share</span>
                        </div>

                        {user._id === poster_id &&
                            <div className='delete-wrapper flex' onClick={() => {return deletePost(post_id);}}>
                                <div className='delete-message'>Delete Post</div>
                                <BsTrash className='trash-button'/>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Post;