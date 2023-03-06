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

    const userID = JSON.parse(sessionStorage.getItem('user'))._id;
    const handleMadeBy = () => { if (text.user_id === friend._id) { made_by = friend.firstname; }}

    handleMadeBy();

    const getStyle = () => {
        if ((userID === text.user_id)) {
            return {background: 'gold', color: 'black', margin: '3vh 0 3vh auto'}
        }
    }

    return (
        <div className="text-format flex" id={textID} style={getStyle()}>
            <img className="text-image" src={text.content} alt=""/>
            <div className='text-content'>{text.content}</div>
            <div className='text-made-by'>{made_by}</div>
        </div>
    );
}

export default Text;