import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "antd";
import Header from "../../components/Header";
import LeftNav from "../../components/LeftNav";
import FrontendAuth from "../../components/FrontendAuth";

const { Footer, Sider, Content } = Layout;
const Admin = () => {
  const user = useSelector((state) => {
    return state.loginReducer;
  });
  if (!user.id) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{ backgroundColor: "white" }}>
          <Switch>
            <FrontendAuth/>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center", color: "#aaaaaa" }}>
          推荐使用谷歌浏览器， 可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
