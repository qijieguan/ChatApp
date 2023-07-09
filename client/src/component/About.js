import './styles/about.css';
import Menu from './Menu.js';

const About = () => {
    return (
        <div className='about-section grid'>
            <div className=' about about-1 flex'>
                <div>Application Technologies</div>
                <div className='about-image'/>
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
                <p>
                    I am an <span>entry-level web developer</span>. My purpose is develop web applications 
                    and prototype different web designs. Enjoy learning 
                    <span> trending web technologies </span> and <span>designs</span> to build websites.
                </p>
            </div>
        </div>
    );
}

export default About;