import './styles/header.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const location = useLocation();

    useEffect(() => { 
        document.querySelector('.App')?.scrollIntoView({top: 0});
    }, [location]);

    const handleScroll = () => {
        if (window.location.href.includes("About") || window.location.href.includes("Register") ) {
            window.location.href = '/' 
        }
        document.getElementsByClassName('home-body-1')[0]?.scrollIntoView();
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
                <header className='header-banner flex'>
                    <div className='header-banner-text'>
                        <div> Welcome, <span>{user.firstname}. </span>
                        <br/>
                            Thank you for being a part of the <span>community</span>.
                        </div>
                    </div>
                    <div className="overlay"/>
                </header>
            }
        </>
    );
}


export default Header;