import './styles/search.css';
import { useState, useEffect } from "react";
import User from './User.js';
import uuid from 'react-uuid';
import axios from 'axios';
import { FcGlobe } from 'react-icons/fc';


const Search = () => {

    const [users, setUsers] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { axios.get(baseURL + '/users/').then((response) => { setUsers(response.data); }); }, [baseURL]);

    return(
        <section className="search">
            <div className='search-wrapper grid'>
                <div className='search-wrapper-label flex'>
                    <div>
                        <FcGlobe className='search-wrapper-icon'/>
                    </div>
                    <span className='search-wrapper-text'>DISCOVER NEW PEOPLE</span>
                </div>
                {users.length > 0 ? users.map(user => <User key={uuid()} user={user}/>) : ""} 
            </div>
        </section>
    );
}

export default Search;