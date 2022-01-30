import { MdPersonAdd } from 'react-icons/md';

const User = ({ user }) => {
    return (
        <div className="user-container">
            <div className='user'>
                <img className="user-image" src={user.image_url} alt=""/>
                <h1 className="user-name">
                    {user.firstname} {user.lastname} 
                    <MdPersonAdd className='user-add' color='orange'/>
                </h1>
            </div>
        </div>
    );
}

export default User;