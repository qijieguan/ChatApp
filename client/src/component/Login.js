import './styles/login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useEffect } from 'react';

const Login = () => {

    const modalStyles = {
        content : {
            display: 'flex',
            flexDirection: 'column',
            alignItem: 'center',
            justifyContent: 'space-around',
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: 'max(20rem, 35%)',
            height: '35%',
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'rgb(30,30,30)'
        },
        overlay: { zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [username, setUsername] = useState("guest");
    const [password, setPassword] = useState("password");
    const [token, setToken] = useState("");
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { 
        if (sessionStorage.getItem('isLogged')) { 
            window.location.href="/Dashboard/Post" 
        } 
    },[]);

    const handleChange = (event) => {
        if (event.target.name === "name") { setUsername(event.target.value); }
        else { setPassword(event.target.value) }
    }

    const authentication = async () => {
        await axios.get(baseURL + '/users/auth/', { headers: { "x-access-token": token } })
        .then((response) => {
            if (response.data.auth) {
                sessionStorage.setItem("isLogged", true);
                setModal(false);
                axios.post(baseURL + '/users/load/', { username: username })
                .then((response) => { 
                    sessionStorage.setItem("user", JSON.stringify(response.data)); 
                    window.location.href = "/Dashboard/Post";
                });
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(baseURL + '/users/login/', { username: username, password: password, })
        .then((response) => { 
            if (response.data !== "Invalid Username/Password combinations!") { 
                setToken(response.data); 
                setModal(true);
                document.querySelector(".login-msg").style.display = 'none';
            }
            else { 
                setMessage(response.data); 
                document.querySelector(".login-msg").style.display = 'block';
            }
        });
    }

    return(
        <div>
            <form className="login flex" onSubmit={handleSubmit}>
                <h1 className="login-label">Enter Your Credentials</h1>
                <div className="login-msg" style={{display: 'none', color: 'red'}}>{message}</div>
                <div className='login-name grid'>
                    <div className='person-icon flex'><BsFillPersonFill/></div>
                    <input type="text" name="name" placeholder="username" value={username} onChange={handleChange} required/>
                </div>
                <div className='login-password grid'>
                    <div className='password-icon flex'><RiLockPasswordLine/></div>
                    <input type="password" name="pass" placeholder="password" value={password} onChange={handleChange} required/>
                </div>
                <button type="submit" className="sign-in-btn">Sign In</button>
                <Link to='/Register' className="register-link">Don't have an account? <span>Create Account</span></Link>
            </form>
            
            <Modal isOpen={modal} style={modalStyles}>
                <AiFillCloseSquare className="close-btn" style={{alignSelf: 'flex-end', color: 'gray'}}
                    onClick={() => {setModal(false); setToken("")} }
                    size={24}
                />
                <h1 className='auth-text'>Please authenticate to access your account</h1>
                <button className="auth-btn" onClick={authentication}>Click to Authenticate</button> 
            </Modal>
        </div>
    );
}

export default Login;