import { useState, useEffect } from "react";
import User from './User.js';
import uuid from 'react-uuid';
import axios from 'axios';
import { FcGlobe } from 'react-icons/fc';

const Search = () => {

    const [users, setUsers] = useState("");

    useEffect(() => {
        axios.get('/users/').then((response) => { setUsers(response.data); });
    }, []);

    return(
        <div id="search">
            <h1 style={{color: 'limegreen'}}> All Users
                <FcGlobe size={60} style={{marginLeft: '10px'}}/>
            </h1>
            {users.length > 0 ? users.map(user => <User key={uuid()} user={user}/>) : ""} 
        </div>
    );
}

export default Search;