const DashBoard = () => {

    const loadImage = () => {
        if (localStorage.getItem('user')) { return JSON.parse(localStorage.getItem('user')).image_url; }
    }

    return (
        <img src={loadImage()} id="user-image" alt=""/>
    );
};

export default DashBoard;