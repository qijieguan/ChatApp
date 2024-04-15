import './styles/home.css';
import Login from "./Login.js";
import { FaWpforms, FaDatabase, FaRegHeart } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";


const Home = () => { 

    return ( 
        <div className="home flex">

            <section className='home-section home-section-1 flex'>
                <Login/>
                <div className='home-image home-image-1'><div className='overlay'/></div>
            </section>

            <section className='home-section home-section-2 grid'>
                <div className='quote top flex'>
                    "How can mirrors be real if our eyes aren't real."
                    <div className='quote-profile quote-profile-2'/>
                </div>
                <div className='quote top flex'>
                    "Sir, this is a wendy's!"
                    <div className='quote-profile quote-profile-3'/>
                </div>
                <div className='banner-text flex'>
                    <h1>Meet New Faces Across the World</h1>
                    <p className='flex'>
                        "The journey of a thousand connections begins with one follow"
                        <div className='quote-profile quote-profile-1'/>
                    </p>
                </div>
                <div className='quote bottom flex'>
                    "Hi everyone I’m Joe Biden’s wife."
                    <div className='quote-profile quote-profile-4'/>
                </div>
                <div className='quote bottom two flex'>
                    "If you don't like your job, you don't go on strike. You just go in every day and do it really half-assed - that's the American way."
                    <div className='quote-profile quote-profile-5'/>
                </div>
                <div className='overlay'/>
            </section>

            <section className='home-section home-section-3 grid'>
                <div className='card flex'>
                    <div className='icon-wrapper'>
                        <FaWpforms className='icon'/>
                    </div>
                    <label className='card-title'>Make a new account</label>
                    <p className='card-description'>
                        Enjoy a simple registration process. Fill in your full name and login credientials
                        on the form. Unique account will be created and added to the userbase.
                    </p>
                </div>

                <div className='card flex'>
                    <div className='icon-wrapper'>
                        <IoShieldCheckmarkOutline className='icon'/>
                    </div>
                    <label className='card-title'>Authentication</label>
                    <p className='card-description'>
                        Secure your login by using the provided authentication method.
                        This step ensures user always authenticate their account as a safety measure.
                    </p>
                </div>

                <div className='card flex'>
                    <div className='icon-wrapper'>
                        <FaDatabase className='icon'/>
                    </div>
                    <label className='card-title'>Backup Data and Storage</label>
                    <p className='card-description'>
                        Dedicated storages working together to maintain userbase and media content.
                        Service data in an instant for all activities between users and communities.
                    </p>
                </div>

                <div className='card flex'>
                    <div className='icon-wrapper'>
                        <FaRegHeart className='icon'/>
                    </div>
                    <label className='card-title'>Key Features</label>
                    <p className='card-description'>
                        Grow your connections to message each other. Post your thoughts and share them publicly.
                        Join communities to engage your interests with everyone. 
                    </p>
                </div>
            </section>
        </div> 
    ); }

export default Home;