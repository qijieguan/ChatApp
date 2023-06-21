import './styles/community-page.css';
import { MdArrowBack } from 'react-icons/md';
import { FaCat } from 'react-icons/fa';

import { useState, useEffect } from 'react';
import  { Link, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

const CommunityPage = () => {

    const location = useLocation();
    
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        if (location.state) {
            setCommunity(location.state.community);
        }
        else {
            setCommunity(null);
        }
    }, [location])

    return (
        <>{community &&
            <div className="community-page">
            <h1 className='community-page-banner'>
                <img src={community.banner_url} alt=""/>
                <Link to="/Dashboard/Community">
                    <div className='community-page-exit flex'>
                        <MdArrowBack className='back-btn'/>
                        <span>Go Back</span>
                    </div>
                </Link>
                <div className='community-page-label flex'>
                    <img src={community.profile_url} className="community-page-profile" alt=""/>
                    <div className='community-page-info flex'>
                        <span className='community-page-name'>R/ {community.name}</span>
                        <span className='community-page-members'>members: {community.members.length}</span>
                    </div>
                    <button className='community-page-join'>Join</button>
                </div>
                <div className='community-page-overlay'/>
            </h1>

            <div className='community-page-posts flex'>
                {community.posts.length > 0 ? 
                    community.posts.map(post => 
                        <div className='community-page-post flex' key={uuid()}>
                            <div className='community-page-post-header flex'>
                                <img src={community.profile_url} alt=""/>
                                <span>{community.name}</span>
                            </div>
                            {post.post_text.length > 0 &&
                                <span>{post.post_text}</span>
                            }
                            {post.post_image.length > 0 &&
                                <img src={post.post_image} alt=""/>   
                            }
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
        </>
        
    )
}

export default CommunityPage;