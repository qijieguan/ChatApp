const friendReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIENDS': 
            return action.payload;
        case 'ADD_FRIEND':
            return [...state, action.payload]
        default:
            return state;
    }
}

export default friendReducer;
