import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const defaultURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";    
    const [url, setURL] = useState("");

    const readFiles = (files) => {
        if (!files) {return}
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setURL(reader.result);
        }, false);
        reader.readAsDataURL(files[0]); 
    }

    const previewFile = (event) => { readFiles(event.target.files); };

    const handleSubmit = (event) => {
        event.preventDefault();
        setURL("");
    };

    return(
        <form id="register" onSubmit={handleSubmit}>
            <h1 id="register-label">Register Your Account</h1>
            <div id="input-container">
                <div id="input-image">
                    <img src={url ? url : defaultURL} id="preview-image" alt=""/>
                    <input type="file" id="file" accept='images/*' onChange={previewFile} required/>
                </div>
                <div id="input-credentials">
                    <h1 className='input-dot'>Username</h1>
                    <input required/>
                    <h1 className='input-dot'>Password</h1>
                    <input required/>
                </div>
            </div>
            <Link to='/' id="login-link">Login</Link>
            <button id="register-btn" type='submit'>Register</button>
        </form>
    );
}

export default Register;