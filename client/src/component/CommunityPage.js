import './styles/community-page.css';
import { MdArrowBack } from 'react-icons/md';
import { FaCat } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { useState, useEffect } from 'react';
import  { Link, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import axios from 'axios';

import { setCommunities } from './actions/index.js';
import { useDispatch } from 'react-redux';

const CommunityPage = () => {
    
    const [community, setCommunity] = useState(null);
    const [show, setShow] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();

    const user = JSON.parse(sessionStorage.getItem('user'));

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    useEffect(() => {
        if (location.state) {
            getCommunityData();
        }
        setShow(false);
    }, [location]);

    const getCommunityData = async () => {
        await axios.post(baseURL + '/communities/view/', {
            community_id : location.state.communityID,
        })
        .then((response) => { setCommunity(response.data); });

        await axios.post(baseURL + '/communities/get/', {
            member_id : user._id,
        })
        .then((response) => { dispatch((setCommunities(response.data))); });
    }

    const join_leave_community = async (communityID) => {
    
        if (checkIsJoined(community) === 'joined') {
            axios.post(baseURL + '/communities/leave/', {
                community_id : communityID,
                member_id: user._id
            })
            .then((response) => { getCommunityData(); })
        }
        else {
            let member = {
                member_id: user._id,
                member_name: user.firstname + " " + user.lastname,
                member_profile: user.profile_url
            }
    
            await axios.post(baseURL + '/communities/join/', {
                community_id : communityID,
                member: member
            })
            .then((response) => { getCommunityData(); });
        }
    }

    const checkIsJoined = (community) => {
        if (community.members.filter(member => member.member_id === user._id).length > 0) {   
            return 'joined';
        }
    }

    return (
        <div>{community &&
            <div className="community-page">
                <div className='community-page-banner'
                    style={{ borderBottom: show && '0' }}
                >
                    <div className='community-page-banner-top'>
                        <img src={community.banner_url} alt=""/>
                        <Link to="/Dashboard/Community">
                            <div className='community-page-exit flex'>
                                <MdArrowBack className='back-btn'/>
                                <span>Go Back</span>
                            </div>
                        </Link>
                    </div>
                    <div className='community-page-banner-down flex'>
                            <div className='community-page-label'>
                                <img src={community.profile_url} className="community-page-profile" alt=""/>
                                <div className='community-page-info flex'>
                                    <span className='community-page-name'>R/ {community.name}</span>
                                    <span className='community-page-members'>members: {community.members.length}</span>
                                </div>
                            </div>
                            <div className='community-page-buttons flex'>
                                <button className={
                                    "community-page-join " 
                                    + checkIsJoined(community)
                                }
                                    onClick={() => {join_leave_community(community._id)}}
                                />
                                <div className='community-page-info-button flex' onClick={() => {setShow(!show)}}>
                                    <AiOutlinePlusCircle className='circle-icon'/>
                                    <span>see community info</span>
                                </div>
                            </div>
                        
                    </div>
                </div>

                <div className='community-page-description flex'
                    style={{
                        padding: show && '2vh 1vw 2vh 2vw', 
                        border: show && '1px solid rgb(180, 180, 180)', 
                        borderTop: show && '0'
                    }}
                    onClick={() => {setShow(!show)}}
                >
                    {show && community.description }
                </div>

                <div className='community-page-posts flex'>
                    {community.posts.length > 0 ? 
                        community.posts.map(post => 
                            <div className='community-page-post flex' key={uuid()}>
                                <div className='community-page-post-header flex'>
                                    <img src={post.poster_image} alt=""/>
                                    <span>{post.poster_name}</span>
                                </div>
                                    <span>{post.primary_text}</span>
                                    <img src={post.primary_image} alt=""/>   
                            </div>    
                        )
                        :
                        <div className='community-page-empty flex'>
                            <span>Wow. Much Empty</span>
                            <FaCat className='cat-icon'/>
                        </div>
                    }
                </div>
            </div>
            }
        </div>
        
    )
}

export default CommunityPage;