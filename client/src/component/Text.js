import { useEffect } from "react";

const Text = ({textID, friend, text }) => {

    useEffect(() => {
        let image = document.createElement('img');
        let el = document.getElementById(textID);
        image.src = text.content;
        image.onload = () => {  el.childNodes[0].style.display = 'unset'; el.classList.add('image'); };
        image.onerror = () => { el.childNodes[1].style.display = 'unset'; };
    },[textID, text.content]);

    const user = JSON.parse(sessionStorage.getItem('user'));

    
    var made_by = user.firstname;
    const handleMadeBy = () => { if (text.user_id === friend._id) { made_by = friend.firstname; }}

    handleMadeBy();

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
                <div className='text-made-by' style={pickStyle('2')}>{made_by}</div>
                {text.content.includes('cloudinary') ?
                    <img className="text-image" src={text.content} alt=""/>
                    :
                    <div className='text-content' style={pickStyle('3')}>{text.content}</div>  
                }
            </div>
        </div>
    );
}

export default Text;