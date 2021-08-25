import React, { useEffect, useState ,useLayoutEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Icon } from "antd";
import { menuList } from "../../config/menuConfig";
import logo from "../../assets/images/logo.png";
import "./index.less";
import { useDispatch, useSelector } from "react-redux";
import { SET_HEAD_TITLE } from "../../redux/actionType";

const SubMenu = Menu.SubMenu;
const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle });

const getOpenKey=(menuList) => {
  let path = "";
  menuList.forEach((item) => {
    if (item.children) {
      const cItem = item.children.find(
        (cItem) => useLocation().pathname.indexOf(cItem.key) >= 0
      );
      if (cItem) {
        
        path =  item.key;
      }
    }
  });
  return path;
}

const LeftNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [menuNodes, setMenuNodes] = useState([]);
  const [openKey] = useState(getOpenKey(menuList));
  const user = useSelector((state) => {
    return state.loginReducer;
  });


  const hasAuth = (item) => {
    const { key, isPublic } = item;
    const menus = user.role ? user.role.menus : "";
    const username = user.name;
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }

    return false;
  };

  const getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (hasAuth(item)) {
        if (!item.children) {
          if (
            item.key === location.pathname ||
            location.pathname.indexOf(item.key) >= 0
          ) {
            // 更新redux中的headerTitle状态
            dispatch(setHeadTitle(item.key));
          }
          pre.push(
            <Menu.Item key={item.key}>
              <Link
                to={item.key}
                onClick={() => dispatch(setHeadTitle(item.title))}
              >
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
      return pre;
    }, []);
  };



  

  useLayoutEffect(() => {
    setMenuNodes(getMenuNodes_map(menuList));
    
  }, []);

  



  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </Link>

      <Menu
        mode="inline"
        theme="dark"
        defaultOpenKeys={[openKey]}
        selectedKeys={[location.pathname]}
      >
        {menuNodes}
      </Menu>
    </div>
  );
};

export default LeftNav;
