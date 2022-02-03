const friendReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIENDS': 
            return action.payload;
        case 'ADD_FRIEND':
            return [...state, action.payload];
        case 'DELETE_FRIEND':
            return state.filter(el => el !== action.payload);
        default:
            return state;
    }
}

export default friendReducer;
