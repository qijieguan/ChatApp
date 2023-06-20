import './styles/community.css';

import Data from './JSON/communities.json';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';

const Community = () => {

    const communities = Data.communities;

    const navigate = useNavigate();

    const handleClick = (community) => {
        navigate('/Dashboard/Community/' + community.name, {state: {community}}, {replace: true});
    }

    return (
        <div className='community-section flex'>
            {communities.length &&
                communities.map(community => 
                    <div className="community flex" key={uuid()} onClick={() => {handleClick(community)}}>
                        <img className="community-image" src={community.profile_url} alt=""/>
                        <div className="community-detail flex">
                            <span className="community-name">{community.name}</span>
                            <p className="community-description">{community.description}</p>
                            <button className="join-button">Join Community</button>
                        </div>
                    </div>  
                )
            }
        </div>
    )
}

export default Community;