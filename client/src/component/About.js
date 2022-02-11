const About = () => {
    return (
        <div id='about'>
            <div id='about-left'>
                How was this application built?
                <p style={{marginLeft: '3%', width: '90%', fontSize: '16px'}}>
                    The app is currently being developed using the <span>MERN</span> stack. 
                    It uses the <span>React</span> framework to design frontend. 
                    The backend is built using <span>Express</span> and <span>Node</span> connected
                    to <span>MongoDB</span>.
                </p>
            </div>
            <div id='about-right-1'/>
            <div id='about-left' style={{color: 'orange', background: 'white'}}>
                What is the goal of this application?
                <p style={{marginLeft: '3%', width: '90%', fontSize: '16px'}}>
                    The app is an experimental project to recreate basic
                    features of a social media appliaction. It includes user 
                    <span> (un)friending functionality </span>. The key feature is 
                    <span> maintaining</span> and <span>displaying chat log </span> 
                    between users.
                </p>
            </div>
            <div id='about-right-2'/>
            <div id='about-left' style={{color: 'white', background: 'orange'}}>
                Who am I?
                <p style={{marginLeft: '3%', width: '90%', fontSize: '16px'}}>
                    I am a self-taught web developer who loves video games. My goal is to become
                    a professional web developer in the future. Always seeking to learn trending web 
                    technologies and practices to built websites.
                </p>
            </div>
            <div id='about-right-3'/>
        </div>
    );
}

export default About;