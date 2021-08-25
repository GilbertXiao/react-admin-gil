import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "antd";
import Header from "../../components/Header";
import LeftNav from "../../components/LeftNav";
import Bar from "../../components/Bar";
import Category from "../../components/Category";
import Line from "../../components/Line";
import Pie from "../../components/Pie";
import Product from "../../components/Product";
import Role from "../../components/Role";
import User from "../../components/User";
import Home from "../../components/Home";

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
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/product" component={Product} />
            <Route path="/role" component={Role} />
            <Route path="/user" component={User} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/line" component={Line} />
            <Route path="/charts/pie" component={Pie} />
            <Redirect to="/home" />
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
