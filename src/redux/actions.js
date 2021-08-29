import { RECEIVE_USER, SHOW_ERROR_MSG,SET_HEAD_TITLE,RESET_USER} from "./actionType";
import { getRequest, postRequest } from "../api/ajax";
import { message } from "antd";
import { saveUser,removeUser } from "../utils/storageUtils";

const receiveUser = (user) => ({ type: RECEIVE_USER, user });
const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });
const resetUser = () => ({ type: RESET_USER});


export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle });

export const login = (name, password) => {
  return async dispatch => {
    // 1. 执行异步ajax请求
    const result = await postRequest("/api/user/login", { name, password }); // {status: 0, data: user} {status: 1, msg: 'xxx'}
   
    // 2.1. 如果成功, 分发成功的同步action
    if (result.status === 0) {
      const user = result.data;
      if (user) {
        const role = await getRequest(`/api/role/get/${user.roleId ?? ""}`);
        // 保存local中
        saveUser({
          id: user.id ?? -1,
          name: user.name ?? "",
          menus: role.menus?.split(",") ?? [],
          roleId: role.id?.toString() ?? "",
        });
        dispatch(
          receiveUser({
            id: user.id,
            name: user.name,
            roleId: user.roleId,
            menus: role.menus?.split(","),
          })
        );
        message.success("登录成功");
      } else {
        dispatch(showErrorMsg("用户名或密码错误"));
      }
    } else {
      // 2.2. 如果失败, 分发失败的同步action
      const msg = result.msg;
      // message.error(msg)
      dispatch(showErrorMsg(msg));
    }
  };
};

export const logout = (dispatch) => {
 dispatch(resetUser());
 removeUser();
}