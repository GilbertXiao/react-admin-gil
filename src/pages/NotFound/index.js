import React from "react";
import { Button, Row, Col } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeadTitle } from "../../redux/actions";
import './not-found.less';

const NotFound = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const goHome = () => {
    dispatch(setHeadTitle("首页"));
    history.replace("/home");
  };

  return (
    <Row className="not-found">
      <Col span={12} className="left"></Col>
      <Col span={12} className="right">
        <h1>404</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <div>
          <Button type="primary" onClick={goHome}>
            回到首页
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default NotFound;
