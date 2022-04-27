import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import axios from 'axios';

const Album = ({ user }) => {

    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {}, [reload]);

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
        data.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

        await fetch(process.env.REACT_APP_IMAGE_URL + '/image/upload', { method: 'POST', body: data })
        .then(res => res.json()).then(json => {
            axios.post('/users/upload_photo', {
                user_id: user._id,
                url: json.secure_url
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadImage();
        user.photo_album.push(url);
        sessionStorage.setItem('user', JSON.stringify(user));
        setURL("");
        setFiles("");
        setReload(!reload);
    }

    return (
        <div className='album-section flex'>
            <div className='album-label'>Photo Album</div>
            <form className='upload-box grid' onSubmit={handleSubmit}>
                <div>Upload pictures to album</div>
                <input type="file" className="file" accept='images/*' onChange={previewFile} required/>
                <button type='submit'>Upload</button>
                <div className='upload-box-overlay'/>
            </form>
            <div className='album-list grid'>
                {user.photo_album.length ?
                    user.photo_album.map(photo => 
                        <img src={photo} key={uuid()} alt=""/>
                    )
                    : <h1>Photo Album is Empty</h1>
                }
            </div>
        </div>
    );
}

export default Album;