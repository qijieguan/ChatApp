import './styles/footer.css';

const Footer = () => {
    return (
        <div className='footer flex'>
            <div className='hour'>
                <h1>Hour of Operation</h1>
                <li>Monday-Friday: 10AM-5PM PST</li>
            </div>
            <div className='contact'>
                <h1>Contact</h1>
                <ul>
                    <li>email - qijieguan7@gmail.com</li>
                    <li>linkedIn - https://www.linkedin.com/in/qi-jie-guan-002924201/ </li>
                    <li>location - Los Angeles County</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;