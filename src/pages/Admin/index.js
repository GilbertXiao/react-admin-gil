import React from 'react'
import {  useSelector } from "react-redux";
import { Redirect } from 'react-router';

const Admin = props => {
  const user = useSelector((state) =>{
    return state.loginReducer;
  });
  if(!user.id){
    return <Redirect to='/login' />
  }
  return (
    <div>
      <h2>后台管理</h2>
      <div>hello {user.name}</div>
    </div>
  )
}


export default Admin

