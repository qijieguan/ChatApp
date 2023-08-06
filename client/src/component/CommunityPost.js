import './styles/community-post.css';
import { AiFillLike  } from 'react-icons/ai';
import { BsShareFill, BsSearch } from 'react-icons/bs';
import { BiCommentMinus } from 'react-icons/bi';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import axios from 'axios';

const CommunityPost = ({communityID, communityName, communityProfile, post}) => {

    const modalStyles = {
        content : {
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            justifyContent: 'space-around',
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

    const [likes, setLikes] = useState(post && post.likes);
    const [commentCount, setComment] = useState(post ? post.comments.length : []);
    const [zoomImage, setZoomImage] = useState(false);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(async () => {
        if (post) { 
            highlightLikes(); 
        }
    }, [likes]);

    const parseStringTime = () => {
        let d = post.createdAt.split('T');
        let t = d[1].substring(0, d[1].length -8).split(":");
        let meridiem = "am";
        let hour = t[0];
        let minutes = t[1];

        if (Number(t[0]) >= 12) {
            if (Number(t[0]) > 12) { hour = (Number(t[0]) - 12).toString(); }
            meridiem = "pm";
        }
        else { meridiem = "am"; }

        return d[0] + " " + hour + ":" + minutes + " " + meridiem;
    }

    const highlightLikes = () => {
        let match = likes.filter(id => id === user._id);

        if (match.length > 0) {
            document.getElementById(post._id)?.querySelector('.community-page-footer>.community-page-likes')?.classList.add('active');
        }
        else {
            document.getElementById(post._id)?.querySelector('.community-page-footer>.community-page-likes')?.classList.remove('active');
        }
    }

    const toggleLike = async (event) => {
        let result;

        if (!event.currentTarget.className.includes('active')) { result = [...likes, user._id]; }
        else { result = likes.filter(id => id !== user._id); }

        await axios.post(baseURL + '/communities/community-post/update-likes/', { 
            community_id: communityID,
            post_id: post._id,
            likes: result
        });

        post.likes = result;
        setLikes(result);
    }

    const viewComment = () => {
        navigate(
            "/Dashboard/Community_Post/" + post._id + "/Comment",
            {state: {
                community_id: communityID,
                community_name: communityName,
                poster_id: communityID,
                poster_name: communityName, 
                poster_profile: communityProfile, 
                post_id: post._id,
                timeStamp: parseStringTime(),
                route: 'communities/community-post'
            }},
            {replace: true}
        );
    }

    return (
        <div className='community-page-post-wrapper flex'>
            { post &&
                <div className='community-page-post flex' id={post._id}>
                    <div className='community-page-post-header flex'>
                        <img src={post.poster_image} alt=""/>
                        <span>{post.poster_name}</span>
                        <div className="post-time flex"> {parseStringTime()} </div>
                    </div>
                    <span>{post.primary_text}</span>

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
 
                    <div className='community-page-footer flex'>
                        <div className='community-page-likes flex' onClick={toggleLike}> 
                            <AiFillLike className='community-page-icon'/>
                            <span>Like</span>
                            {likes.length > 0 &&
                                <div className='like-count count flex'>{likes.length}</div>
                            }
                        </div>
                        <div className='community-page-comment flex' onClick={viewComment}>
                            <BiCommentMinus className='community-page-icon'/>
                            <span>Comment</span>
                            {commentCount > 0 &&
                                <div className='comment-count count flex'>{commentCount}</div>
                            }
                        </div>
                        <div className='community-page-share flex'>
                            <BsShareFill className='community-page-icon' style={{fontSize: 'clamp(0.875rem, 1.25vw, 1.25rem)'}}/>
                            <span>Share</span>
                        </div>
                    </div>
                </div>  
            }
        </div>  
    )
}

export default CommunityPost;