import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import headerReducer from './headerReducer';
import productReducer from './productReducer';



export const reducer = combineReducers({
  loginReducer,headerReducer,productReducer
})
