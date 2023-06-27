const communityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMMUNITIES': 
            return action.payload;
        default:
            return state;
    }
}

export default communityReducer;