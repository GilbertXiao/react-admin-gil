import React from "react";
import { Route,Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import routerConfig from "../../config/routerConfig";


const FrontendAuth = () => {
  //get user from store
  const user = useSelector((state) => {
    return state.loginReducer;
  });
  const location = useLocation();
  const { pathname } = location;
  const targetRouter = routerConfig.find(item=>item.path===pathname);
  const isLogin = !!user && user.id;

  if(targetRouter && !isLogin && !targetRouter.auth){
    const {component} = targetRouter;
    return <Route exact path={pathname} component={component} />
  }

  if (isLogin) {
    if(pathname==="/login"){
      return <Redirect to="/"/>
    }else{
      if(targetRouter){
        return <Route path={pathname} component={targetRouter.component} />
      }else{
        return <Redirect to="/404"/>
      }
    }
  }else{
    //no login status and targetRouter is valid
    if(targetRouter&&targetRouter.auth){
      return <Redirect to="/login"/>
    }else{
      //targetRouter is invalid
      return <Redirect to="/404"/>
      
    }

  }
};

export default FrontendAuth;
