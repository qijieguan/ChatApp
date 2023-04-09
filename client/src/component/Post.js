import './styles/post.css';
import { useState, useEffect } from 'react';
import PostCollection from './PostCollection.js';
import uuid from 'react-uuid';
import axios from 'axios';

const Post = () => {

    const [textInp, setTextInp] = useState("");
    const [postArr, setPostArr] = useState([]);
    const [render, setRender] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => { getPosts() }, [render]);

    const getPosts = async () => {  
        await axios.post(baseURL + '/posts')
        .then(response => { setPostArr(response.data); });
    }

    const handleChange = (event) => {
        setTextInp(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(baseURL + '/posts/add/', {
            poster_id: user._id,
            poster_image: user.profile_url,
            poster_name: user.firstname + ' ' + user.lastname,
            post: {primary_text: textInp, primary_image: '', replies: []}
        })
        setTextInp('');
        setRender(!render);
    }

    return (
        <div className='post-section'>
            <form className='post-form flex' onSubmit={handleSubmit}>
                <h1>Ready to post your thoughts</h1>
                <div className='post-input'>
                    <input
                        type='text'
                        name="post-input"
                        placeholder='Write something to post...'
                        value={textInp}
                        onChange={handleChange}
                    />
                    <button className='post-image'>Image</button>
                    <hr/>
                    <button type='submit' className='submit'>Create Post</button>
                </div>
            </form>
            
            {postArr.length ?
                postArr.map(collection => <PostCollection key={uuid()} collection={collection}/>)
                :
                ""
            }
        </div>
    );
}

export default Post;