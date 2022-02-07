import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
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
        width: '35%',
        height: '35%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)', 
        zIndex: '4'
        }
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
        await axios.get('http://localhost:3001/users/auth/', { headers: { "x-access-token": token } })
        .then((response) => {
            if (response.data.auth) {
                sessionStorage.setItem("isLogged", true);
                setModal(false);
                axios.post('http://localhost:3001/users/load/', { username: username })
                .then((response) => { 
                    sessionStorage.setItem("user", JSON.stringify(response.data)); 
                    window.location.href = "/Dashboard";
                });
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3001/users/login/', { username: username, password: password, })
        .then((response) => { 
            if (response.data !== "Invalid Username/Password combinations!") { 
                setToken(response.data); 
                setModal(true);
                document.getElementById("login-msg").style.display = 'none';
            }
            else { 
                setMessage(response.data); 
                document.getElementById("login-msg").style.display = 'block';
            }
        });
    }

    return(
        <div>
            <form id="login" onSubmit={handleSubmit}>
                <h1 id="login-label">Login</h1>
                <h3 id="login-msg" style={{display: 'none', color: 'red'}}>{message}</h3>
                <div style={inputStyle}>
                    <div style={Object.assign({background: 'blue'}, iconStyle)}><FaUser size={20}/></div>
                    <input type="text" name="name" placeholder="username" value={username} onChange={handleChange} required/>
                </div>
                <div style={inputStyle}>
                    <div style={Object.assign({background: 'red'}, iconStyle)}><RiLockPasswordLine size={20}/></div>
                    <input type="password" name="pass" placeholder="password" value={password} onChange={handleChange} required/>
                </div>
                <Link to='/Register' id="register-link">Register</Link>
                <button type="submit" id="login-btn" style={btnStyle}>Sign In</button>
            </form>
            
            <Modal isOpen={modal} style={modalStyles}>
                <AiFillCloseSquare id="close-btn" style={{alignSelf: 'flex-end', color: 'red'}}
                    onClick={() => {setModal(false); setToken("")} }
                    size={24}
                />
                <button style={authBtnStyle} onClick={authentication}>Click to Authenticate</button> 
            </Modal>

        </div>
    );
}

const iconStyle = {
    display: 'flex',
    height: '100%',
    width: '15%',
    borderRadius: '3px 0 0 3px',
    boxShadow: '-1px 0 3px black'
}

const inputStyle = {
    display: 'flex', 
    height: '50px', 
    width: '80%'
}

const btnStyle = {
    fontSize: '16px',
    height: '50px',
    width: '80%',
    color: 'white',
    background: 'linear-gradient(45deg, limegreen, green)',
}

const authBtnStyle = {
    height: '75px',
    width: '80%',
    color: 'white',
    background: 'orange'
}

export default Login;