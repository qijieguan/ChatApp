import './styles/about.css';
import SideNav from './SideNav.js';

const About = () => {
    return (
        <div className='about-wrapper flex'>
            {sessionStorage.getItem("isLogged") ? <SideNav/>:''}  
            <div className='about-section flex'>
                <div className=' about about-1 flex'>
                    <div>Application Technologies</div>
                    <div className='about-image'/>
                    <div className='linebreak'></div>
                    <p>
                        The app is currently being developed using the <span>MERN</span> stack. 
                        It uses the <span>React</span> framework to design frontend. 
                        The backend is built using <span>Express</span> and <span>Node</span> connected
                        to <span>MongoDB</span>.
                    </p>
                </div>

                <div className='about about-2 flex'>
                    <div>Application Specifications</div>
                    <div className='about-image'/>
                    <div className='linebreak'></div>
                    <p>
                        The app is an experimental project to recreate simple
                        functions of a messanging appliaction. It includes user 
                        <span> friending functionality</span>. The main function is 
                        <span> maintaining</span> and <span>displaying message log </span> 
                        between users.
                    </p>
                </div>
                
                <div className='about about-3 flex'>
                    <div>My Purpose</div>
                    <div className='about-image'/>
                    <div className='linebreak'></div>
                    <p>
                        I am an <span>entry-level web developer</span>. My purpose is develop web applications 
                        and prototype different web designs. Enjoy learning 
                        <span> trending web technologies </span> and <span>designs</span> to build websites.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;