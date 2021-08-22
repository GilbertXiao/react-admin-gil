import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Icon, Button, message } from "antd";
import logo from "./images/logo.png";
import { saveUser } from "../../utils/storageUtils";
import { useDispatch, useSelector } from "react-redux";
import { RECEIVE_USER, SHOW_ERROR_MSG } from "../../redux/actionType";
import "./login.less";
import { getRequest, postRequest } from "../../api/ajax";

const receiveUser = (user) => ({ type: RECEIVE_USER, user });
const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

const validatePwd = (rule, value) => {
  if (!value) {
    return Promise.reject("密码必须输入");
  } else if (value.length < 3 || value.length > 12) {
    return Promise.reject("密码长度不能小于4位或大于12位");
  } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return Promise.reject("密码必须是英文，数字和下划线组成");
  } else {
    return Promise.resolve();
  }
};

function Login(props) {
  const dispatch = useDispatch();

  const login = async (name, password) => {
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
      dispatch({ type: SHOW_ERROR_MSG, msg });
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    login(values.name, values.password);
  };

  // 如果用户已经登陆, 自动跳转到管理界面
  const user = useSelector((state) => {
    return state.loginReducer;
  });

  if (user && user.id) {
    return <Redirect to="/"/>;
  }

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登陆</h2>
        <Form className="login-form" onFinish={handleSubmit}>
          <Form.Item
            rules={[
              { required: true, whitespace: true, message: "请输入您的用户名" },
              { max: 12, message: "用户名最多12位" },
              { min: 3, message: "用户名至少三位" },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "用户名必须是英文,数字和下划线组成",
              },
            ]}
            name="name"
          >
            {/*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
               */}

            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ validator: validatePwd }]}>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default Login;
