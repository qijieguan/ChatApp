import { RiLogoutBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {

    const logout = () => { localStorage.clear(); window.location.href = '/'; }

    return (
        <header id="App-header">
            <h1>Chat App</h1>
            <div style={{width: '25%'}}>
                {!localStorage.getItem("isLogged") ?
                    <Link to='/'><button>Login</button></Link>
                    :
                    <button onClick={logout}>Log Out</button>
                }
                <button style={{background: 'red'}}>About</button>
            </div>
        </header>
    );
}

export default Header;