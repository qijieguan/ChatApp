import { useEffect } from "react";

const Text = ({textID, friend, text }) => {

    var made_by = 'You';

    useEffect(() => {
        let image = document.createElement('img');
        let el = document.getElementById(textID);
        image.src = text.content;
        image.onload = () => {  el.childNodes[0].style.display = 'unset'; el.classList.add('image'); };
        image.onerror = () => { el.childNodes[1].style.display = 'unset'; };
    },[textID, text.content]);

    const user = JSON.parse(sessionStorage.getItem('user'));
    const handleMadeBy = () => { if (text.user_id === friend._id) { made_by = friend.firstname; }}

    handleMadeBy();

    const getStyle = (param) => {
        if (param === '1') {
            if ((user._id === text.user_id)) {
                return { flexDirection: 'row-reverse' }
            }
        }
        else { 
            if ((user._id === text.user_id)) {
                return {background: 'orange', color: 'black', margin: '3vh 0 3vh auto'}
            }
        }
    }

    return (
        <div className="text flex" style={getStyle('1')}>
            <img src={user._id === text.user_id ? user.profile_url : friend.profile_url} className="texter" alt=""/>
            <div className="text-format flex" id={textID} style={getStyle('2')}>
                <img className="text-image" src={text.content} alt=""/>
                <div className='text-content'>{text.content}</div>
            <div className='text-made-by'>{made_by}</div>
        </div>
        </div>
    );
}

export default Text;