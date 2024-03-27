import './styles/home.css';
import Login from "./Login.js";
import { FaWpforms, FaDatabase, FaRegHeart } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => { 

    const url = "https://cdn.pixabay.com/photo/2016/07/13/11/32/photomontage-1514218_1280.jpg";

    useEffect(() => {
        if (!sessionStorage.getItem('visited')) {
            //guestSignIn();
        }   
    }, []);

    
    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const guestSignIn = async () => {
        await axios.post(baseURL + '/users/login/', { username: 'guest', password: 'password', })
        .then(async (response) => { 
            await axios.get(baseURL + '/users/auth/', { headers: { "x-access-token": response.data } })
            .then(async (response) => {
                if (response.data.auth) {
                    sessionStorage.setItem("isLogged", true);
                    axios.post(baseURL + '/users/load/', { username: 'guest' })
                    .then((response) => { 
                        sessionStorage.setItem("user", JSON.stringify(response.data)); 
                        sessionStorage.setItem('visited', true);
                        window.location.href = "/Dashboard/Post";
                    });
                }
            });
        });
    }

    return ( 
        <div className="home flex">

            <section className='home-section home-section-1 flex'>
                <Login/>
                <div className='home-image home-image-1'><div className='overlay'/></div>
            </section>

            <section className='home-section home-section-2 flex'>
                <div className='overlay grid'>
                    <div className='quote top flex'>"How can mirrors be real if our eyes aren't real." <span>- Jaden Smith</span></div>
                    <div className='quote top flex'>"Sir, this is a wendy's!" <span>- Wendy's employee</span></div>
                    <div className='banner-text flex'>
                        <h1>Meet New Faces Across the World</h1>
                        <p className='flex'>"The journey of a thousand connections begins with one follow" <span>- Sun Tzu</span></p>
                    </div>
                    <div className='quote bottom flex'>"Hi everyone I’m Joe Biden’s wife." <span>- Joe Biden</span></div>
                    <div className='quote bottom flex'>
                        "If you don't like your job, you don't go on strike. You just go in every day and do it really half-assed - that's the American way."
                        <span>- Homer Simpson</span>
                    </div>
                </div>
                <img className='home-image home-image-2' src={url} alt=""/>
            </section>

            <section className='home-section home-section-3 grid'>
                <div className='overlay-1'></div>
                <div className='overlay-2'></div>
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