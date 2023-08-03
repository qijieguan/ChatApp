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
            justifyContent: 'center',
            rowGap: '2vh',
            top : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: 'min(95vw, 40rem)',
            height: '35%',
            transform: 'translate(-50%, -50%)', 
            color: 'rgb(77, 77, 77)',
            backgroundColor: 'rgb(100, 100, 255)',
            border: '1px solid rgb(180, 180, 180)',
        },
        overlay: { backgroundColor: 'rgb(230, 230, 230, 0.7)', zIndex: '4' }
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
            window.location.href="/Dashboard/Post";
        } 
    },[]);

    const handleChange = (event) => {
        if (event.target.name === "username") { setUsername(event.target.value); }
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

    const highlight = (param) => {
        if (param.length) {
            return 'highlight'
        }
        else {
            return '';
        }
    }

    return(
        <div>
            <form className="login flex" onSubmit={handleSubmit}>
                <h1 className="login-label">Enter Login</h1>
                <div className="login-msg" style={{display: 'none', color: 'red'}}>{message}</div>
                <div className={'login-username grid ' + highlight(username)}>
                    <input type="text" name="username" className='login-username-input' value={username} onChange={handleChange} required/>
                    <div className='username-placeholder flex'>Username</div>
                    <div className='login-icon flex'><BsFillPersonFill/></div>
                </div>
                <div className={'login-password grid ' + highlight(password)}>
                    <input type="password" name="password" className='login-password-input' value={password} onChange={handleChange} required/>
                    <div className='password-placeholder flex'>Password</div>
                    <div className='login-icon flex'><RiLockPasswordLine/></div>
                </div>
                <button type="submit" className="sign-in-btn">Login</button>
                <Link to='/Register' className="register-link">
                    <span>Don't have an account? </span>
                    <span>Sign up here</span>
                </Link>
            </form>
            
            <Modal isOpen={modal} style={modalStyles}>
                <AiFillCloseSquare className="close-btn" style={{alignSelf: 'flex-end', color: 'white'}}
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