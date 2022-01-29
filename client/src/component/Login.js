import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [name, setName] = useState("Guest");
    const [password, setPassword] = useState("password");

    const handleChange = (event) => {
        if (event.target.name === "name") { setName(event.target.value); }
        else { setPassword(event.target.value) }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setName("");
        setPassword("");
    }

    return(
        <form id="login" onSubmit={handleSubmit}>
            <h1 style={{fontSize: '28px'}}>Login</h1>
            <div style={inputStyle}>
                <div style={iconStyle}><FaUser size={20}/></div>
                <input type="text" name="name" placeholder="username" value={name} onChange={handleChange} required/>
            </div>
            <div style={inputStyle}>
                <div style={Object.assign({background: 'red'}, iconStyle)}><RiLockPasswordLine size={20}/></div>
                <input type="password" name="password" placeholder="password" value={password} onChange={handleChange} required/>
            </div>
            <Link to='/Register' id="register-link">Register</Link>
            <button type="submit" id="login-btn" style={btnStyle}>Sign In</button>
        </form>
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

export default Login;