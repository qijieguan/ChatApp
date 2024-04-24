import './styles/header.css';
import { SiMusicbrainz } from "react-icons/si";

import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => { 
        document.querySelector('.App')?.scrollIntoView({top: 0});
        
        toggleButtons();
    }, [location]);

    const toggleButtons = () => {
            
        if (location.pathname === '/') {
            let login = document.querySelector('.login-btn');
            let features = document.querySelector('.features-btn');
            if (!features?.classList.contains('toggled')) { 
                document.querySelector('.toggled')?.classList.remove('toggled');
                login?.classList.add('toggled') 
            }
        }
        else if (location.pathname === '/Register') { 
            document.querySelector('.toggled')?.classList.remove('toggled');
            document.querySelector('.login-btn')?.classList.add('toggled');
        }
        else if (location.pathname === '/About') { 
            document.querySelector('.toggled')?.classList.remove('toggled');
            document.querySelector('.about-btn')?.classList.add('toggled');
        }
       
    }

    const navRootRoute = () => {
        if (location.pathname === "/Register" || location.pathname === '/About' ) {
            navigate('/'); 
        }
        document.querySelector('.toggled')?.classList.remove('toggled');
        document.querySelector('.features-btn')?.classList.add('toggled');
        setTimeout(() => {document.querySelector('.home-section-3')?.scrollIntoView({block: 'start'});})
    }

    const toggleBtn = (e) => {
        document.querySelector('.toggled')?.classList.remove('toggled');
        e.target?.classList.add('toggled');
    }

    return (
        <> 
            {!sessionStorage.getItem("isLogged") ?
                <header className='app-header flex'>
                    <label className='app-logo flex'>
                        VeeChat
                        <SiMusicbrainz className='app-logo-icon'/>
                    </label>
                    <div className="header-btns flex">
                        <Link to='/'><button className="header-btn login-btn" onClick={(e) => {toggleBtn(e)}}>Login</button></Link>
                        <button className='header-btn features-btn' onClick={() => {navRootRoute()}}>Features</button>
                        <Link to='/About'><button className="header-btn about-btn"  onClick={(e) => {toggleBtn(e)}}>My Story</button></Link>
                    </div>
                </header>
                :
                <header className='header-banner flex'>
                    <div className='header-banner-text'>
                        <div> Welcome, <span>{user.firstname}. </span>
                        <br/>
                            Share your thoughts with the <span>world</span>.
                        </div>
                    </div>
                    <div className="overlay"/>
                </header>
            }
        </>
    );
}


export default Header;