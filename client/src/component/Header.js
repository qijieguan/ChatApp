import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Header = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('isLogged')) { setUser(JSON.parse(localStorage.getItem('user'))); }
    }, []);

    const logout = () => { localStorage.clear(); window.location.href = '/'; }

    return (
        <header id="App-header">
            <h1>Chat App</h1>
            <div style={customStyle}>
                {!localStorage.getItem("isLogged") ?
                    <Link to='/'><button>Login</button></Link>
                    :
                    <button style={{background: 'red'}} onClick={logout}>Log Out</button>
                }
                <button style={{background: 'limegreen', marginRight: 'auto'}}>About</button>
                {!localStorage.getItem("isLogged") ?
                    ""
                    :
                    <>
                        <img src={user.image_url} id="user-icon" alt=""/>
                        <h6 style={{color: 'white', wordBreak: 'break-all'}}>{user.firstname} {user.lastname}</h6>
                    </>
                }
            </div>
        </header>
    );
}

const customStyle = {
    display: 'flex', 
    justifyContent: 'none',
    marginRight: '20px',
    height: '100%',
    width: '30%', 
}

export default Header;