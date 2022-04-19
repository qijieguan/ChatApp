const Chat = ({ chat, getSelect }) => {
    return (
        <div className='chat-wrapper'>
            <div className="chat flex" onClick={() => getSelect(chat._id)}>
                <img src={chat.image_url} alt=""/>
                <h1>{chat.firstname} {chat.lastname}</h1>
            </div>
        </div>
    );
}

export default Chat;