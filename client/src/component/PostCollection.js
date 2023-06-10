import './styles/post-section.css';

import uuid from 'react-uuid';

import Post from './Post.js';

const PostCollection = ({collection, deletePost}) => {

    return (    
        collection.post_collection.map(post => 
            <Post 
                post={post} 
                poster_id={collection.poster_id}
                poster_profile={collection.poster_image}
                poster_name={collection.poster_name} 
                post_image={post.primary_image}
                post_text={post.primary_text}
                deletePost={deletePost}
                key={uuid()}
            />
        )   
    )
}

export default PostCollection;