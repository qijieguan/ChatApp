import { useState, useEffect } from "react";
import User from './User.js';
import uuid from 'react-uuid';
import axios from 'axios';

const Search = () => {

    const [users, setUsers] = useState("");

    useEffect(() => {
        axios.get('/users/').then((response) => { setUsers(response.data); });
    }, []);

    return(
        <div id="search">
            <h1 style={fontStyle}>Discover and Connect with People</h1>
            {users.length > 0 ? users.map(user => <User key={uuid()} user={user}/>) : ""} 
        </div>
    );
}

const fontStyle = {
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '45px',
    fontFamily: 'copperplate',
    color: 'limegreen',
    textShadow: '0 0 1px green',
};

export default Search;