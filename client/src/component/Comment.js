import './styles/comment.css';
import { AiOutlineDown, AiOutlineCamera } from 'react-icons/ai';
import { FaCat } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';

import { useState } from 'react';
import axios from 'axios';

const Comment = ({ comments, postID, posterID, increment }) => {

    const [commentArr, setCommentArr] = useState(comments);
    const [commentInp, setCommentInp] = useState("");

    const user = JSON.parse(sessionStorage.getItem('user'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

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
        .then((response) => {
        });

        setCommentArr([...commentArr, comment]);
        setCommentInp('');
        increment();
    }

    return (
        <div className='comment-section flex'>
            <div className='comment-input flex'>
                <img src={user.profile_url} alt=""/>
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
            <div className='comment-label flex'>
                <span>All Comments</span>
                <AiOutlineDown className='comment-down-icon'/>
            </div>

            <div className='comment-collection flex'>
                {commentArr.length > 0 ?
                    commentArr.map(c => 
                        <div className='comment flex' key={c._id}>
                            <img src={c.user_profile} className='comment-profile' alt=""/>
                            <div className='comment-text'>
                                <span className='comment-name'>{c.user_name}: </span> 
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

export default Comment;