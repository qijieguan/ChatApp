import { BsTrash, BsFillShareFill } from 'react-icons/bs';
import { BiCommentMinus } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import uuid from 'react-uuid';

import Comment from './Comment.js';

const PostCollection = ({collection, deletePost}) => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (    
        collection.post_collection.map(post => 
            <div className='post flex' key={uuid()}>
                <div className='post-header flex'>
                    <img className='poster-image' src={collection.poster_image} alt=""></img>
                    <div className='poster-name'>{collection.poster_name}</div>
                </div>
                <div className='primary-text'>{post.primary_text}</div>
                {post.primary_image &&
                    <img src={post.primary_image} className='primary-image' alt=""/>
                }
                {user._id === collection.poster_id &&
                    <div className='delete-wrapper flex'>
                        <div className='delete-message'>Delete Post</div>
                        <BsTrash className='trash-button' onClick={() => {return deletePost(post._id);}}/>
                    </div>
                }
                <div className='post-footer flex'>
                    <div className='post-like flex'>
                        <AiFillLike className='post-icon'/>
                        <span>Like</span>
                    </div>

                    <div className='post-comment flex'>
                        <BiCommentMinus className='post-icon'/>
                        <span>Comment</span>
                    </div>

                    <div className='post-share flex'>
                        <BsFillShareFill className='post-icon'/>
                        <span>Share</span>
                    </div>
                </div>

                <Comment 
                    comments={post.comments} 
                    postID={post._id}
                    posterID={collection.poster_id}
                />
            </div>
        )   
    )
}

export default PostCollection;