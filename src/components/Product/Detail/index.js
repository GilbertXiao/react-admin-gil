import React from "react";
import { Card, List } from "antd";
import { useSelector } from "react-redux";
import LinkButton from "../../LinkButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import  './index.less';

const ProductDetail = () => {
  const { name, desc, price, pName, cName, images,detail } = useSelector(
    (state) => state.productReducer
  );
  const history = useHistory();
  const imageList = images?.split(",") ?? [];
  const title = (
    <span>
      <LinkButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowLeftOutlined style={{ marginRight: "5px" }} />
      </LinkButton>
      <span>商品详情</span>
    </span>
  );
  return (
    <div>
      <div>
        <Card title={title} className="product-detail">
          <List className="list">
            <List.Item className="item">
              <span className="left">商品名称:</span>
              <span className="right">{name}</span>
            </List.Item>
            <List.Item className="item">
              <span className="left">商品描述:</span>
              <span>{desc}</span>
            </List.Item>
            <List.Item className="item">
              <span className="left">商品价格:</span>
              <span>{price}</span>
            </List.Item>
            <List.Item className="item">
              <span className="left">所属分类:</span>
              <span>
                {pName === "" ? "" : `${pName}-->`}
                {cName}
              </span>
            </List.Item>
            <List.Item className="item">
              <span className="left">商品图片:</span>
              <span>
                {imageList.map((img) => {
                  return (
                    <img
                      key={img}
                      className="product-img"
                      src={`http://localhost:5000/files/${img}`}
                      alt="img"
                    ></img>
                  );
                })}
              </span>
            </List.Item>
            <List.Item className="item">
              <span className="left">商品详情:</span>
              <span dangerouslySetInnerHTML={{ __html: detail ?? "" }}></span>
            </List.Item>
          </List>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
