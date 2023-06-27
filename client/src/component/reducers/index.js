import friendReducer from "./friendReducer";
import communityReducer from "./communityReducer";
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    friends: friendReducer,
    communities: communityReducer
}); 

export default allReducers;