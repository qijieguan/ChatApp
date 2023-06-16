import './styles/community.css';

import Data from './JSON/communities.json';
import uuid from 'react-uuid';

const Community = () => {

    const communities = Data.communities;

    return (
        <div className='community-section flex'>
            {communities.length &&
                communities.map(community => 
                    <div className="community flex" key={uuid()}>
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