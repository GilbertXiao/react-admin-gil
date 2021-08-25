import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import headerReducer from './headerReducer';



export const reducer = combineReducers({
  loginReducer,headerReducer
})
