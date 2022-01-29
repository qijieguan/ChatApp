import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="App-header">
            <h1>Chat App</h1>
            <div style={{width: '25%'}}>
                <Link to='/'><button>Login</button></Link>
                <button style={{background: 'red'}}>About</button>
            </div>
        </header>
    );
}

export default Header;