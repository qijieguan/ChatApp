import './styles/search.css';
import { useState, useEffect } from "react";
import User from './User.js';
import uuid from 'react-uuid';
import axios from 'axios';
import { FcGlobe } from 'react-icons/fc';
import SideNav from './SideNav.js';

const Search = () => {

    const [users, setUsers] = useState("");

    useEffect(() => { axios.get('/users/').then((response) => { setUsers(response.data); }); }, []);

    return(
        <>
            <SideNav/>
            <div className="search">
                <div className='search-wrapper grid'>
                    <h1 className='flex'><FcGlobe size={80} style={{marginRight: '1rem'}}/> All Users</h1>
                    {users.length > 0 ? users.map(user => <User key={uuid()} user={user}/>) : ""} 
                </div>
            </div>
        </>
    );
}

export default Search;