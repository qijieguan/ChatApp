import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { AiOutlineWechat } from 'react-icons/ai';

const Header = () => {

    const [user, setUser] = useState([]);
    const location = useLocation()

    useEffect(() => {
        if (sessionStorage.getItem('isLogged')) { setUser(JSON.parse(sessionStorage.getItem('user'))); }
        toggleRipple();
    }, [location]);

    const toggleRipple = () => {
        let buttons = document.querySelectorAll("button");
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;

                let ripples = document.createElement('span');
                ripples.classList.add("ripples");

                if (this.getBoundingClientRect().width <= 200) { ripples.classList.add('rippleSmall') }
                else if (this.getBoundingClientRect().width <= 400) { ripples.classList.add('rippleMedium') }
                else { ripples.classList.add('rippleLarge') }

                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';

                this.appendChild(ripples);
            
                setTimeout(() => ripples.remove(), 1000);
            });
        })
    }

    const logout = () => { sessionStorage.clear(); window.location.href = '/'; }

    return (
        <header id="App-header">
            <h1>CHAT APP</h1>
            <div style={customStyle}>
                {!sessionStorage.getItem("isLogged") ?
                    <Link to='/'><button id="login-btn">Login</button></Link>
                    :
                    <button id="logout-btn" onClick={logout}>Log Out</button>
                }
                <Link to='/About'><button id="about-btn">About</button></Link>
                {!sessionStorage.getItem("isLogged") ?
                    "" :
                    <>
                        <img src={user.image_url} id="user-icon" alt=""/>
                        <h6 style={{color: 'white', wordBreak: 'break-all', marginRight: '10px'}}>{user.firstname} {user.lastname}</h6>
                    </>
                }
            </div>
        </header>
    );
}

const customStyle = {
    display: 'flex', 
    justifyContent: 'flex-start',
    height: '100%',
    width: '30%', 
}

export default Header;