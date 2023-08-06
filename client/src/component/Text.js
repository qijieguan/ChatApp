import { BsCheckAll } from 'react-icons/bs';
import { useEffect } from "react";

const Text = ({textID, friend, text }) => {

    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        let image = document.createElement('img');
        let el = document.getElementById(textID);
        image.src = text.content;
        image.onload = () => {  el.childNodes[0].style.display = 'unset'; el.classList.add('image'); };
        image.onerror = () => { el.childNodes[1].style.display = 'unset'; };
    },[textID, text.content]);

    const parseStringTime = () => {
        let d = text.createdAt.split('T');
        let t = d[1].substring(0, d[1].length -8).split(":");
        let meridiem = "am";
        let hour = t[0];
        let minutes = t[1];

        if (Number(t[0]) >= 12) {
            if (Number(t[0]) > 12) { hour = (Number(t[0]) - 12).toString(); }
            meridiem = "pm";
        }
        else { meridiem = "am"; }

        return d[0] + " " + hour + ":" + minutes + " " + meridiem;
    }

    const pickStyle = (param) => {
        if ((user._id === text.user_id)) {
            if (param === '1') { return { flexDirection: 'row-reverse', alignSelf: 'flex-end' } }
            else if (param === '2')  { return { marginLeft: 'auto', marginRight: '0'} }
            else { return { backgroundColor: 'wheat' } }
        }
    }

    return (
        <div className="text flex" style={pickStyle('1')}>
            <img src={user._id === text.user_id ? user.profile_url : friend.profile_url} className="texter" alt=""/>
            <div className="text-format flex" id={textID} style={pickStyle('2')}>
                {text.content.includes('cloudinary') ?
                    <img className="text-image" src={text.content} alt=""/>
                    :
                    <div className='text-content' style={pickStyle('3')}>{text.content}</div>  
                }
               
                <div className="time-format flex">
                    <span>{ parseStringTime() }</span>
                    <BsCheckAll className='check-icon'/>
                </div>
                
            </div>
        </div>
    );
}

export default Text;