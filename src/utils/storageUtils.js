/*
进行local数据存储管理的工具模块
 */
import store from "store";

const USER_KEY = 'user_key';

export const saveUser=(user)=>{
   // localStorage.setItem(USER_KEY, JSON.stringify(user))
   store.set(USER_KEY, user)
}

export const getUser=()=>{
  // localStorage.setItem(USER_KEY, JSON.stringify(user))
  return store.get(USER_KEY) || {}
}

export const removeUser=()=>{
  // localStorage.setItem(USER_KEY, JSON.stringify(user))
  store.remove(USER_KEY)
}
