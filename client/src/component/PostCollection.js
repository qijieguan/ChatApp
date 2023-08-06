import uuid from 'react-uuid';

import Post from './Post.js';

const PostCollection = ({collection, deletePost}) => {
    return (    
        <Post 
            post={collection.post} 
            post_id = { collection._id }
            poster_id={collection.poster_id}
            poster_profile={collection.poster_image}
            poster_name={collection.poster_name}
            timeStamp={collection.createdAt} 
            deletePost={deletePost}
            key={uuid()}
        />    
    )
}

export default PostCollection;