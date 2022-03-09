import './styles/home.css';
import SideNav from './SideNav.js';

const About = () => {
    return (
        <div style={{display: !sessionStorage.getItem('isLogged') ? 'flex' : ''}}>
            <SideNav/>  
            <div id='about' 
                style={
                    !sessionStorage.getItem('isLogged') ? 
                        {width: '80%', marginTop: '50px'} 
                        : {width: '60%'}
                    }
            >
                <div id='about-left' style={{color: 'white', background: 'teal'}}>
                    <div>How was this application built?</div>
                    <p>
                        The app is currently being developed using the <span>MERN</span> stack. 
                        It uses the <span>React</span> framework to design frontend. 
                        The backend is built using <span>Express</span> and <span>Node</span> connected
                        to <span>MongoDB</span>.
                    </p>
                </div>
                <div id='about-right-1'/>
                <div id='about-left' style={{color: 'teal', background: 'white'}}>
                    <div>What is the goal of this application?</div>
                    <p>
                        The app is an experimental project to recreate basic
                        features of a social media appliaction. It includes user 
                        <span> (un)friending functionality </span>. The key feature is 
                        <span> maintaining</span> and <span>displaying chat log </span> 
                        between users.
                    </p>
                </div>
                <div id='about-right-2'/>
                <div id='about-left' style={{color: 'white', background: 'teal'}}>
                    <div>Who am I?</div>
                    <p>
                        I am a <span>self-taught web developer</span>. My goal is 
                        to develop websites in a production environment. Enjoy discovering 
                        <span> trending web technologies </span> and <span>ideas</span> to build websites.
                    </p>
                </div>
                <div id='about-right-3'/>
            </div>
        </div>
    );
}

export default About;