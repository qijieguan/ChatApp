import { BsTrash } from 'react-icons/bs';

const Chat = ({ chat, getSelect, removeChat }) => {
    
    return (
        <div className='chat-wrapper flex' id={chat._id}>
            <div className="chat flex" onClick={() => getSelect(chat._id)}>
                <img src={chat.image_url} alt=""/>
                <h1>{chat.firstname} {chat.lastname}</h1>
            </div>
            <div className='trash-wrapper' onClick={() => removeChat(chat)}>
                <BsTrash className='trash-icon'/>
                <div className='trash-overlay flex'>Delete Chat Log</div>
            </div>
        </div>
    );
}

export default Chat;