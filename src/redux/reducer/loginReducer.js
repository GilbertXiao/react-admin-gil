import { getUser } from '../../utils/storageUtils';
import {
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from "../actionType";

const initUser = getUser();

const loginReducer = (state = initUser, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVE_USER:
      return action.user;
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg;
      // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
      return { ...state, errorMsg };
    case RESET_USER:
      return {};
    default:
      return state;
  }
};

export default loginReducer;
