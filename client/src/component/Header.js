import './styles/nav.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineWechat } from 'react-icons/ai';

const Header = () => {

    const location = useLocation();

    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toggleRipple(); 
        let element = document.getElementById(location.pathname);
        if (element) { element.classList.add('active'); }
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

    return (
        <> 
            {!sessionStorage.getItem("isLogged") ?
                <header className="App-header flex">
                    <h1 className='flex'>CHAT APP <AiOutlineWechat style={{margin:'0 0 0.5rem 0.25rem'}}/></h1>
                    <div className="header-btns flex">
                        <Link to='/'><button className="login-btn">Login</button></Link>
                        <Link to='/About'><button className="about-btn">About</button></Link>
                    </div>
                </header>
                :
                <div className='header-alt flex'>
                    <div className='header-alt-text'>
                        <div> Discover and Form New<span> Connections </span>Anywhere</div>
                        <div>Feel Free to<span> Message </span>Your Friends</div>
                    </div>
                    <div className="overlay"/>
                </div>
            }
        </>
    );
}


export default Header;