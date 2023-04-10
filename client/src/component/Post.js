import './styles/post.css';
import { useState, useEffect } from 'react';
import PostCollection from './PostCollection.js';
import uuid from 'react-uuid';
import axios from 'axios';

const Post = () => {

    const [textInp, setTextInp] = useState("");
    const [imageInp, setImageInp] = useState("");
    const [files, setFiles] = useState("");
    const [postArr, setPostArr] = useState([]);
    const [render, setRender] = useState(false);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => { getPosts() }, [render]);

    const getPosts = async () => {  
        await axios.post(baseURL + '/posts')
        .then(response => { setPostArr(response.data); });
    }

    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setImageInp(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const handleUpload = () => {
        //document.getElementsByClassName('post-image-input')[0].click();
    }

    const handleChange = (event) => {
        if (event.target.name === 'post-text-input') {
            setTextInp(event.target.value);
        }
        //else {
        //    readFiles(event.target.files); 
        //}
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!files.length && !textInp.length) { return; }

        if (files) {
            const data = new FormData();
            data.append('file', files[0]);
        
            await axios.post(baseURL + '/cloud/upload-image', data)
            .then(async (response) => {
                await postApiRequest(response.data);
            });   
        }
        else {
            await postApiRequest('');
        }   

        setTextInp('');
        setImageInp('');
        setFiles('');
        setRender(!render);
    }

    const postApiRequest = async (image_url) => {
        await axios.post(baseURL + '/posts/add/', {
            poster_id: user._id,
            poster_image: user.profile_url,
            poster_name: user.firstname + ' ' + user.lastname,
            post: {primary_text: textInp, primary_image: image_url, replies: []}
        })
    }

    return (
        <div className='post-section'>
            <form className='post-form flex' onSubmit={handleSubmit}>
                <h1>Ready to post your thoughts</h1>
                <div className='post-input'>
                    <input
                        type='text'
                        name="post-text-input"
                        placeholder='Write something to post...'
                        value={textInp}
                        onChange={handleChange}
                    />
                    <button className='post-image' onClick={handleUpload}>Image</button>
                    <input
                        type='file'
                        name="post-image-input"
                        className="post-image-input"
                        accept='images/*'
                        onChange={handleChange}
                    />
                    {imageInp ?
                        <img className='image-input-preview' src={imageInp} alt=""/>
                        :
                        ""
                    }
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