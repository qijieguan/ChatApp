import { BsTrash } from 'react-icons/bs';
import uuid from 'react-uuid';

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
                {post.primary_image ?
                    <img src={post.primary_image} className='primary-image' alt=""/>
                    :
                    ""
                }
                {user._id === collection.poster_id ?
                    <div className='delete-wrapper flex'>
                        <div className='delete-message'>Delete Post</div>
                        <BsTrash className='trash-button' onClick={() => {return deletePost(post._id);}}/>
                    </div>
                    :
                    ''
                }
            </div>
        )   
    )
}

export default PostCollection;