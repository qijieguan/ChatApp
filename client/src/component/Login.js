import './styles/form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { AiFillCloseSquare } from 'react-icons/ai';
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
        },
        overlay: { zIndex: '4' }
    };

    Modal.setAppElement(document.getElementById('root'));

    const [username, setUsername] = useState("Guest");
    const [password, setPassword] = useState("password");
    const [token, setToken] = useState("");
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { if (sessionStorage.getItem('isLogged')) { window.location.href="/Dashboard" } },[]);

    const handleChange = (event) => {
        if (event.target.name === "name") { setUsername(event.target.value); }
        else { setPassword(event.target.value) }
    }

    const authentication = async () => {
        await axios.get('/users/auth/', { headers: { "x-access-token": token } })
        .then((response) => {
            if (response.data.auth) {
                sessionStorage.setItem("isLogged", true);
                setModal(false);
                axios.post('/users/load/', { username: username })
                .then((response) => { 
                    sessionStorage.setItem("user", JSON.stringify(response.data)); 
                    window.location.href = "/Dashboard";
                });
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/users/login/', { username: username, password: password, })
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
        <div style={{width: '100%'}}>
            <form className="login flex" onSubmit={handleSubmit}>
                <h1 className="login-label">Enter Your Credentials</h1>
                <div className="login-msg" style={{display: 'none', color: 'red'}}>{message}</div>
                <input type="text" name="name" placeholder="username" value={username} onChange={handleChange} required/>
                <input type="password" name="pass" placeholder="password" value={password} onChange={handleChange} required/>
                <button type="submit" className="sign-in-btn">Sign In</button>
                <div style={{color: 'gray'}}>or</div>
                <Link to='/Register' className="register-link"><button>Create a New Account</button></Link>
            </form>
            
            <Modal isOpen={modal} style={modalStyles}>
                <AiFillCloseSquare className="close-btn" style={{alignSelf: 'flex-end', color: 'red'}}
                    onClick={() => {setModal(false); setToken("")} }
                    size={24}
                />
                <button className="auth-btn" onClick={authentication}>Click to Authenticate</button> 
            </Modal>
        </div>
    );
}

export default Login;