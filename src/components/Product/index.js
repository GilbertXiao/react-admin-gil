import React, { useState, useEffect, useReducer } from "react";
import { Button, Card, Input, message, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LinkButton from "../LinkButton";
import { PAGE_SIZE } from "../../utils/Constants";
import { useHistory } from "react-router";
import { getRequest, postRequest } from "../../api/ajax";

const columns = [
  {
    title: "商品名称",
    dataIndex: "name",
  },
  {
    title: "商品描述",
    dataIndex: "desc",
  },
  {
    title: "价格",
    dataIndex: "price",
    render: (price) => {
      return "￥" + price;
    },
  },
  {
    title: "状态",
    render: (product) => {
      const { status, id } = product;
      return (
        <span>
          <Button
            type="primary"
            onClick={() => {
              if (id === undefined) {
                message.error("id为空");
                return;
              }
              this.updateStatus(id, status === 1 ? 2 : 1);
            }}
          >
            {status === 1 ? "下架" : "上架"}
          </Button>
          <span>{status === 1 ? "在售" : "已下架"}</span>
        </span>
      );
    },
  },
  {
    title: "操作",
    render: (product) => {
      return (
        <span>
          <LinkButton
            onClick={() => {
              this.showDetails(product);
            }}
          >
            详情
          </LinkButton>
          <LinkButton
            onClick={() => {
              this.showUpdate(product);
            }}
          >
            修改
          </LinkButton>
        </span>
      );
    },
  },
];
const extra = (
  <Button
    type="primary"
    icon={<PlusOutlined />}
    onClick={() => {
      useHistory().push("/product/add");
    }}
  >
    添加商品
  </Button>
);

const reducer = (state, action) => {
  
};
const Product = () => {
  const [productState, setProductState] = useState({
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: "", // 搜索的关键字
    searchType: "productName", // 根据哪个字段搜索
    pageNum: 1,
  });
  const { total, products, loading, searchName, searchType, pageNum } =
    productState;

  const getDataSources = async (pageNum) => {
    setProductState({ loading: true });
    let result = null;
    if (searchName !== "") {
      if (searchType === "productName") {
        result = await getRequest("/api/products/searchByName", {
          name: searchName,
          pageNum: pageNum,
          pageSize: PAGE_SIZE,
        });
        
      } else {
        result = await getRequest(
          `/api/products/searchByDesc/${searchName}/${pageNum}/${PAGE_SIZE}`
        );
      }
    } else {
      result = await postRequest("/api/products/list", {
        pageNum,
        pageSize: PAGE_SIZE,
      });
      
    }
    setProductState({
      products: result.list,
      total: result.total,
      loading: false,
      pageNum: pageNum,
    });
  };

  const title = (
    <span>
      <Select
        value={searchType}
        style={{ width: 150 }}
        onChange={(value) =>
          setProductState({ ...productState, searchType: value })
        }
      >
        <Select.Option value="productName">按名称搜索</Select.Option>
        <Select.Option value="productDesc">按描述搜索</Select.Option>
      </Select>
      <Input
        placeholder="关键字"
        style={{ width: 150, margin: "0 15px" }}
        value={searchName}
        onChange={(event) =>
          setProductState({ ...productState, searchName: event.target.value })
        }
      />
      <Button type="primary" onClick={() => getDataSources(1)}>
        搜索
      </Button>
    </span>
  );

  useEffect(() => {
    getDataSources(pageNum);
  }, []);
  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        rowKey="_id"
        loading={loading}
        dataSource={products}
        columns={columns}
        pagination={{
          current: pageNum,
          total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: getDataSources,
        }}
      />
    </Card>
  );
};

export default Product;
