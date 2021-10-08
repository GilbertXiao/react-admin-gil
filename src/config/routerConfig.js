import React from "react";
import PropTypes from "prop-types";
import Bar from "../components/Bar";
import Category from "../components/Category";
import Line from "../components/Line";
import Pie from "../components/Pie";
import Product from "../components/Product";
import Role from "../components/Role";
import User from "../components/User";
import Home from "../components/Home";
import Order from "../components/Order";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import ProductAdd from "../components/Product/Add";
import PrductDetail from "../components/Product/Detail";

const routerConfig = [
  {
    path: "/", // 对应的path
    auth: true, // 公开的
    component: Home,
  },
  {
    path: "/home", // 对应的path
    auth: true, // 公开的
    component: Home,
  },
  {
    path: "/category",
    auth: true,
    component: Category,
  },
  {
    path: "/product",
    auth: true,
    component: Product,
  },
  {
    path: "/product/add",
    auth: true,
    component: ProductAdd,
  },
  {
    path: "/product/update",
    auth: true,
    component: ProductAdd,
  },
  {
    path: "/product/detail",
    auth: true,
    component: PrductDetail,
  },
  {
    path: "/user",
    auth: true,
    component: User,
  },
  {
    path: "/role",
    auth: true,
    component: Role,
  },
  {
    path: "/charts/bar",
    auth: true,
    component: Bar,
  },
  {
    path: "/charts/line",
    auth: true,
    component: Line,
  },
  {
    path: "/charts/pie",
    auth: true,
    component: Pie,
  },
  {
    path: "/order",
    auth: true,
    component: Order,
  },
];

routerConfig.PropTypes = {
  path: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired,
  component: PropTypes.component,
};

export default routerConfig;
