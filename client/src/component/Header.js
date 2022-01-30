import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const Header = () => {

    const [user, setUser] = useState([]);
    const location = useLocation()

    useEffect(() => {
        if (localStorage.getItem('isLogged')) { setUser(JSON.parse(localStorage.getItem('user'))); }
        toggleRipple();
    }, [location]);

    const toggleRipple = () => {
        let buttons = document.querySelectorAll("button");
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;

                let ripples = document.createElement('span');
                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';
                this.appendChild(ripples);
                    
                setTimeout(() => ripples.remove(), 1000)
            });
        })
    }

    const logout = () => { localStorage.clear(); window.location.href = '/'; }

    return (
        <header id="App-header">
            <h1>Chat App</h1>
            <div style={customStyle}>
                {!localStorage.getItem("isLogged") ?
                    <Link to='/'><button style={{background: 'linear-gradient(45deg, blue, aqua)', borderRadius: '50px'}}>Login</button></Link>
                    :
                    <button style={{background: 'linear-gradient(45deg, red, orange)', borderRadius: '50px'}} onClick={logout}>Log Out</button>
                }
                <button style={{background: 'linear-gradient(45deg, purple, violet)', marginRight: 'auto', borderRadius: '50px'}}>About</button>
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