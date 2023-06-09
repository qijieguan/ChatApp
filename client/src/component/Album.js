import './styles/album.css';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import Photo from './Photo.js';

const Album = ({ callRender }) => {

    var user = JSON.parse(sessionStorage.getItem('user'));
    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    const [album, setAlbum] = useState();

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';


    useEffect(() => {
        getFullAlbum();
    }, [])

    const getFullAlbum = async() => {
        await axios.get(baseURL + '/cloud/get-background-images')
        .then(response => {
            setAlbum(response.data.concat(user.photo_album));
        })
    }

    
    const readFiles = (files) => {
        if (!files) { return }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files) }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const uploadImage = async () => {
        const data = new FormData();

        data.append('file', files[0]);
        
        await axios.post(baseURL + '/cloud/upload-image', data)
        .then((response) => {
            axios.post(baseURL +'/users/upload_photo', {
                user_id: user._id,
                url: response.data
            });
        });  
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        await uploadImage();
        setAlbum([...album, url]);
        user.photo_album.push(url);
        sessionStorage.setItem('user', JSON.stringify(user));
        setURL("");
        setFiles("");
        document.querySelector(".file").value="";
    }

    const render = () => {
        return callRender();
    }

    
    return (
        <div className='album-section flex'>
            <div className='album-label-1'>Photo Album</div>
            <div className='album-message'>( click to select )</div>
            
            <form className='upload-box grid' onSubmit={handleUpload}>
                <div>Upload pictures to album</div>
                <input type="file" className="file" accept='images/*' onChange={previewFile} required/>
                <button type='submit'>Upload</button>
            </form>
            
            <div className='album-label-2'>SELECT A PHOTO TO CHANGE PROFILE/BACKGROUND</div>
            
            <form className='album-list grid'>
                {album ?
                    album.map(photo => 
                        <Photo key={uuid()} photo={photo} render={render} photoID={uuid()}/>
                    )
                    : <h1>Photo Album is Empty</h1>
                }
            </form>
        </div>
    );
}

export default Album;