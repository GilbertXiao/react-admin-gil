import { SET_HEAD_TITLE } from "../actionType";

const initHeadTitle = "";


const headerReducer = (state=initHeadTitle, action) => {
  const {type} = action;
  switch(type){
    case SET_HEAD_TITLE :{
      return action.data;
    }
    default :{
      return state;
    }
  }
}

export default headerReducer
