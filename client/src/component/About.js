import './styles/home.css';
import SideNav from './SideNav.js';

const About = () => {
    return (
        <div className='about-wrapper flex'>
            <SideNav/>  
            <div className='about grid'>
                <div className='about-left flex' style={{color: 'white', background: 'teal'}}>
                    <div>How was this application built?</div>
                    <p>
                        The app is currently being developed using the <span>MERN</span> stack. 
                        It uses the <span>React</span> framework to design frontend. 
                        The backend is built using <span>Express</span> and <span>Node</span> connected
                        to <span>MongoDB</span>.
                    </p>
                </div>
                <div className='about-right-1 flex'/>
                <div className='about-left flex' style={{color: 'teal', background: 'white'}}>
                    <div>What is the goal of this application?</div>
                    <p>
                        The app is an experimental project to recreate basic
                        functions of a messanging appliaction. It includes user 
                        <span> (un)friending functionality</span>. The key feature is 
                        <span> maintaining</span> and <span>displaying message log </span> 
                        between users.
                    </p>
                </div>
                <div className='about-right-2 flex'/>
                <div className='about-left flex' style={{color: 'white', background: 'teal'}}>
                    <div>Who am I?</div>
                    <p>
                        I am a <span>self-taught web developer</span>. My goal is 
                        to develop websites in a production environment. Enjoy discovering 
                        <span> trending web technologies </span> and <span>ideas</span> to build websites.
                    </p>
                </div>
                <div className='about-right-3 flex'/>
            </div>
        </div>
    );
}

export default About;