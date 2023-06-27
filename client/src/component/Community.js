import './styles/community.css';

import Data from './JSON/communities.json';
import uuid from 'react-uuid';
import { useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import axios from 'axios';

const Community = () => {

    const [communities, setCommunities] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem('user'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        getCommunities();
    }, []);

    const getCommunities = async() => {
        await axios.get(baseURL + '/communities/')
        .then((response) => { setCommunities(response.data) });
    }

    const handleClick = (community) => {
        navigate('/Dashboard/Community/' + community.name, {state: {communityID: community._id}}, {replace: true});
    }

    const joinCommunity = async (communityID) => {
        let member = {
            member_id: user._id,
            member_name: user.firstname + " " + user.lastname,
            member_profile: user.profile_url
        }

        await axios.post(baseURL + '/communities/join/', {
            community_id : communityID,
            member: member
        })
        .then((response) => { 
            //console.log(response.data) 
        });
    }

    const checkIsJoined = (community) => {
        if (community.members.filter(member => member.member_id === user._id).length > 0) {
            return 'joined';
        }
    }

    return (
        <div className='community-section flex'>
            {communities.length > 0 &&
                communities.map(community => 
                    <div className="community flex" key={uuid()} onClick={() => {handleClick(community)}}>
                        <img className="community-image" src={community.profile_url} alt=""/>
                        <div className="community-detail flex">
                            <span className="community-name">{community.name}</span>
                            <p className="community-description">{community.description}</p>
                            <button className={
                                "join-button "
                                + checkIsJoined(community)
                            } 
                                onClick={() => {joinCommunity(community._id)}}
                            />
                        </div>
                    </div>  
                )
            }
        </div>
    )
}

export default Community;