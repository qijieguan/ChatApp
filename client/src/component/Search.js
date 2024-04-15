import './styles/search.css';
import { CircularProgress } from '@mui/material';

import { useState, useEffect } from "react";
import User from './User.js';
import uuid from 'react-uuid';
import axios from 'axios';
import { FcGlobe } from 'react-icons/fc';


const Search = () => {

    const [users, setUsers] = useState([]);
    const [searchList, setList] = useState([]);
    const [searchTerm, setTerm] = useState("");

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => { axios.get(baseURL + '/users/').then((response) => { setUsers(response.data); }); }, [baseURL]);

    const handleSearch = (e) => {
        setTerm(e.target.value);
        
        let list = users.filter(user => {
            let name = user.firstname + " " + user.lastname;
            if (name.toLowerCase().match(e.target.value.toLowerCase())) {
                return user;
            }
        });

        list = list.length === 0 ? users : list; 
        setList(list);
    }

    return(
        <section className="search">
            <div className='search-wrapper grid'>
                <div className='search-wrapper-label flex'>
                    <div>
                        <FcGlobe className='search-wrapper-icon'/>
                    </div>
                    <span className='search-wrapper-text'>DISCOVER NEW PEOPLE</span>
                </div>
                <input
                    className='user-search-input'
                    value={searchTerm}
                    onChange={(e) => {handleSearch(e)}}
                    placeholder='Enter a name to search your friends'
                />
                {users.length > 0 || searchList.length > 0 ? 
                    (searchList.length > 0 ? searchList : users).map(user => <User key={uuid()} user={user}/>) 
                    : 
                    <div className='loading-screen-wrapper flex'>
                        <CircularProgress className='loading-screen'
                            sx={{color:"darkslategray"}} 
                        />
                        <span>Loading</span>
                    </div>
                } 
            </div>
        </section>
    );
}

export default Search;