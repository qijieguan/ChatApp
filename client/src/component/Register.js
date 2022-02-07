import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {

    const defaultURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [fname, setFname] = useState(""); 
    const [lname, setLname] = useState("");   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    const [message, setMessage] = useState("");

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
            axios.post('/users/register', {
                username: username,
                password: password,
                image_url: json.secure_url,
                firstname: fname,
                lastname: lname
            }).then((response) => { 
                axios.post('/friends/init', { user_id: response.data._id });
                setMessage("User is added!");
                document.getElementById("register-msg").style.display = 'block'; 
            });
        });
    };

    const handleChange = (event) => {
        if (event.target.name === "firstname") { setFname(event.target.value); }
        else if (event.target.name === "lastname") { setLname(event.target.value); }
        else if (event.target.name === "username") { setUsername(event.target.value); }
        else { setPassword(event.target.value); }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadImage();
        setUsername("");
        setPassword("");
        setURL("");
        setFname("");
        setLname("");
        setFiles([]);
        document.getElementById("file").value="";
    };

    return(
        <form id="register" onSubmit={handleSubmit}>
            <h1 id="register-label">Register Your Account</h1>
            <h3 id="register-msg">{message}</h3>
            <div id="input-container">
                <div id="input-image">
                    <img src={url ? url : defaultURL} id="preview-image" alt=""/>
                    <input type="file" id="file" accept='images/*' onChange={previewFile} required/>
                </div>
                <div id="input-credentials">
                    <div style={customStyle}>
                        <h1 className='input-dot'>First Name</h1>
                        <input name="firstname" id="firstname" value={fname} placeholder='Ex. Mike' onChange={handleChange} required/>
                    </div>
                    <div style={customStyle}>
                        <h1 className='input-dot'>Last Name</h1>
                        <input name="lastname" id="lastname" value={lname} placeholder='Ex. Hawk' onChange={handleChange} required/>
                    </div>
                    <h1 className='input-dot'>Username</h1>
                    <input name="username" value={username} placeholder="Username/Email" onChange={handleChange} required/>
                    <h1 className='input-dot'>Password</h1>
                    <input type="password" name="password" value={password} placeholder='Atleast 5 Characters' onChange={handleChange} required/>
                </div>
            </div>
            <Link to='/' id="login-link">Login</Link>
            <button id="register-btn" type='submit'>Register</button>
        </form>
    );
}

const customStyle = {
    display: 'inline-block', 
    width: '46%'
}

export default Register;