import './styles/about.css';
import Menu from './Menu.js';

const About = () => {
    return (
        <div className='about-section grid'>
            <div className=' about about-1 flex'>
                <div className='about-image-wrapper'>
                    <div className='about-image'/>
                </div>
                <div>Tech Stack</div>
                <p>
                    The app is currently being developed using the <span>MERN</span> stack. 
                    It uses the <span>React</span> framework to design frontend. 
                    The backend is built using <span>Express</span> and <span>Node</span> connected
                    to <span>MongoDB</span>.
                </p>
            </div>

            <div className='about about-2 flex'>
                <div className='about-image-wrapper'>
                    <div className='about-image'/>
                </div>
                <div>Specifications</div>
                <p>
                    The app is an experimental project to recreate simple
                    functions of a messanging appliaction. It includes user 
                    <span> friending functionality</span>. The main function is 
                    <span> maintaining</span> and <span>displaying message log </span> 
                    between users.
                </p>
            </div>
            
            <div className='about about-3 flex'>
                <div className='about-image-wrapper'>
                    <div className='about-image'/>
                </div>
                <div>My Story</div>
                <p>
                    I am an <span>entry-level web developer</span>. My dream is to gain industry experience 
                    and grow into professional in a web developer role. I enjoy <span>exploring</span> and
                    <span> creating</span> UI/UX designs through my projects.
                </p>
            </div>
        </div>
    );
}

export default About;