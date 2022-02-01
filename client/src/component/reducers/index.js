import friendReducer from "./friendReducer";
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    friends: friendReducer,
}); 

export default allReducers;