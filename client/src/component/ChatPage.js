import ChatBox from './ChatBox.js';
import SideNav from './SideNav.js';

const ChatPage = () => { 
    return ( 
        <div className="chat-page flex">
            <SideNav/>
            <ChatBox/>
        </div> 
    ); };

export default ChatPage;