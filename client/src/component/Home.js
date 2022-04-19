import './styles/home.css';
import Login from "./Login.js";

const Home = () => { 
    return ( 
        <div className="home">
            <div className="home-left flex"><Login/></div>
            <div className="home-right flex"></div>
        </div> 
    ); }

export default Home;