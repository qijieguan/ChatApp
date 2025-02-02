import './styles/footer.css';

const Footer = () => {
    return (
        <div className='footer grid'>
            <div className='hour'>
                <h1>Hours of Operation</h1>
                <li>Monday - Friday: 10AM - 5PM PST</li>
            </div>
            <div className='contact'>
                <h1>Contact</h1>
                <ul>
                    <li>Email - qijieguan7@gmail.com</li>
                    <li>LinkedIn - https://www.linkedin.com/in/qi-jie-guan-002924201/ </li>
                    <li>Location - Los Angeles County</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;