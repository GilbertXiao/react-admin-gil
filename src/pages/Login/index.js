import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Icon, Button } from "antd";
import logo from "./images/logo.png";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import "./login.less";



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

  const handleSubmit = (values) => {
    //console.log(values);
    login(values.name, values.password)(dispatch);
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
