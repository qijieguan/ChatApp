import './styles/register.css';
import { useState } from 'react';
import axios from 'axios';


const Register = () => {

    const defaultURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    const [fname, setFname] = useState(""); 
    const [lname, setLname] = useState("");   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [files, setFiles] = useState("");  
    const [url, setURL] = useState("");
    
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const readFiles = (files) => {
        if (!files) { return; }
        const reader = new FileReader();
        reader.addEventListener("load", () => { setURL(reader.result); setFiles(files); }, false);
        reader.readAsDataURL(files[0]); 
    }

    const handleChange = (event) => {
        if (event.target.name === "register-image-input") { readFiles(event.target.files) } 
        else if (event.target.name === "firstname") { setFname(event.target.value); }
        else if (event.target.name === "lastname") { setLname(event.target.value); }
        else if (event.target.name === "username") { setUsername(event.target.value); }
        else { setPassword(event.target.value); }
    }

    const handleUpload = () => {
        document.getElementsByClassName('register-image-input')[0].click();
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', files[0]);

        await axios.post(baseURL + '/cloud/upload-image', data)
        .then((response) => {
            axios.post(baseURL +'/users/register/', {
                username: username,
                password: password,
                profile_url: response.data,
                firstname: fname,
                lastname: lname,
            }).then((response) => { 
                axios.post(baseURL +'/friends/init/', { user_id: response.data._id });
                document.querySelector(".register-msg").style.display = 'block'; 
            });
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadImage();
        setUsername("");
        setPassword("");
        setURL("");
        setFname("");
        setLname("");
        setFiles([]);
    };

    return(
        <form className="register-form flex" onSubmit={handleSubmit}>
            <h1 className="register-label">Create Your Account</h1>
      
            <div className="image-input flex">
                <img src={url ? url : defaultURL} className="preview-register-image" alt=""/>
                <input 
                    type="file" 
                    name="register-image-input" 
                    className="register-image-input" 
                    accept='images/*' 
                    onChange={handleChange} 
                    required
                />
                <div className="register-image-button" onClick={handleUpload}>Upload Image</div>
            </div>

            <div className='register-inputs flex'>
                <div className='register-input-wrapper flex'>
                    <h1 className='input-label'>First Name</h1>
                    <span>Please enter your first name</span>
                    <input name="firstname" value={fname} placeholder='Ex. Mike' onChange={handleChange} minLength="2" required/>
                </div>
                <div className='register-input-wrapper flex'>
                    <h1 className='input-label'>Last Name</h1>
                    <span>Please enter your last name</span>
                    <input name="lastname" value={lname} placeholder='Ex. Hawk' onChange={handleChange} minLength="2" required/>
                </div>
                <div className='register-input-wrapper flex'>
                    <h1 className='input-label'>Username</h1>
                    <span>Please enter your login username</span>
                    <input name="username" value={username} placeholder="Username/Email" onChange={handleChange} minLength="5" required/>
                </div>
                <div className='register-input-wrapper flex'>
                    <h1 className='input-label'>Password</h1>
                    <span>Please enter your login password</span>
                    <input type="password" name="password" value={password} placeholder='Atleast 8 Characters' onChange={handleChange} minLength="8" required/>
                </div>
            </div>
            <button className="register-btn" type='submit'>CREATE NEW ACCOUNT</button>
        </form>
    );
}



export default Register;