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
        if (!text.createdAt) { return null }

        let [Y, M, D, H, m, s] = text.createdAt.split(/\D/);
        let date = new Date(Date.UTC(Y, M-1, D, H, m, s));
    
        let local_date = date.toLocaleString('default', { 
            //weekday: "long",
            year: "numeric", 
            month: "short", 
            day: "numeric", 
            hour: '2-digit', 
            minute:'2-digit' 
        });

        let result = local_date.split(', ');
        
        return result[0] + " at " + result[2];
    }

    const pickStyle = (param) => {
        if ((user._id === text.user_id)) {
            if (param === '1') { return { flexDirection: 'row-reverse', alignSelf: 'flex-end' } }
            else if (param === '2')  { return { margin: '1vh 0.5vw 3vh auto'} }
            else { return { color: 'wheat', backgroundColor: 'black' } }
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