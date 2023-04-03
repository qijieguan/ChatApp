import './styles/header.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const location = useLocation();

    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        //toggleRipple(); 
        let element = document.getElementById(location.pathname);
        if (element) { element.classList.add('active'); }
    }, [location]);

    const handleScroll = () => {
        document.getElementsByClassName('home-body-1')[0].scrollIntoView({behavior: 'smooth'})
    }

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
                <header className="app-header">
                    <div className="header-btns flex">
                        <Link to='/'><button className="login-btn">Login</button></Link>
                        <Link to='/About'><button className="about-btn">About</button></Link>
                        <button className='start-btn' onClick={() => {handleScroll()}}>Let's Get Started</button>
                    </div>
                </header>
                :
                <div className='header-banner flex'>
                    <div className='header-banner-text'>
                        <div> Welcome, <span>{user.firstname}. </span>
                        <br/>
                            Thank you for being a part of the <span>community</span>.
                        </div>
                    </div>
                    <div className="overlay"/>
                </div>
            }
        </>
    );
}


export default Header;