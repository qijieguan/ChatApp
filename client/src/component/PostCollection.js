import uuid from 'react-uuid';

const PostCollection = ({collection}) => {
    return (    
        collection.post_collection.map(post => 
            <div className='post' key={uuid()}>
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
            </div>
        )   
    )
}

export default PostCollection;