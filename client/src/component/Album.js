import './styles/album.css';
import { CircularProgress } from '@mui/material';

import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import Photo from './Photo.js';

const Album = ({ callRender, album, userID, user }) => {

    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    const [fullAlbum, setFullAlbum] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        getFullAlbum();
    }, [userID])

    const getFullAlbum = async() => {
        await axios.get(baseURL + '/cloud/get-background-images')
        .then(response => {
            setFullAlbum(response.data.concat(album));
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
        setFullAlbum([...fullAlbum, url]);
        //user.photo_album.push(url);
        //sessionStorage.setItem('user', JSON.stringify(user));
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
            
            <form className='upload-box flex' onSubmit={handleUpload}>
                <div>Upload pictures to album</div>
                <input type="file" className="file" accept='images/*' onChange={previewFile} required/>
                <button type='submit'>Upload</button>
            </form>
            
            <div className='album-label-2'>SELECT A PHOTO TO CHANGE PROFILE/BACKGROUND</div>
            
            <form className='album-list grid'>
                {fullAlbum.length ?
                    fullAlbum.map(photo => 
                        <Photo key={uuid()} photo={photo} render={render} photoID={uuid()} userID={userID} user={user}/>
                    )
                    :
                    <div className='loading-screen-wrapper flex'>
                        <CircularProgress className='loading-screen'
                            sx={{color:"darkslategray"}} 
                        />
                        <span>Loading</span>
                    </div>
                }
            </form>
        </div>
    );
}

export default Album;