import React from "react";
import { Button, Card, Cascader, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import LinkButton from "../../LinkButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import PictureWall from './PictureWall';
import RichTextEditor from './RichTextEditor';

const ProductAdd = () => {

  const history = useHistory();

  const product = useSelector(
    (state) => state.productReducer
  );

  const title = (
    <span>
      <LinkButton
        style={{ fontSize: 20 }}
        
      >
        <ArrowLeftOutlined style={{ margin: 5 }} />
      </LinkButton>
      <span>{true ? '修改商品' : '添加商品'}</span>
    </span>
  );
  return (
    <div>
      <div>
				<Card title={title}>
					<Form
						
						initialValues={{ remember: true }}
					
						className="add-update-from"
						
					>
						<Form.Item
							name="name"
							label="商品名称"
							className="item"
							initialValue={product?.name}
							rules={[{ required: true, message: '必须输入商品名称' }]}
						>
							<Input placeholder="请输入商品名称"></Input>
						</Form.Item>
						<Form.Item
							initialValue={product?.desc}
							name="desc"
							label="商品描述"
							className="item"
							rules={[{ required: true, message: '必须输入商品描述' }]}
						>
							<Input.TextArea placeholder="请输入商品描述" autoSize />
						</Form.Item>
						<Form.Item
							name="price"
							initialValue={product?.price}
							label="商品价格"
							className="item"
							rules={[
								{ required: true, message: '必须输入商品价格' },
								
							]}
						>
							<Input type="number" placeholder="请输入商品价格" addonAfter="元"></Input>
						</Form.Item>
						<Form.Item
							name="category"
							label="商品分类"
							className="item"
							
							rules={[{ required: true, message: '必须制定商品分类' }]}
						>
							<Cascader
								
							
								changeOnSelect
								placeholder="请选择"
							></Cascader>
						</Form.Item>
						<Form.Item label="商品图片" className="item">
							<PictureWall  images={product?.images ?? ''}></PictureWall>
						</Form.Item>
						<Form.Item label="商品详情" className="item" labelCol={{ span: 1 }} wrapperCol={{ span: 12 }}>
							<RichTextEditor  detail={product?.detail ?? ''} />
						</Form.Item>
						<Form.Item >
							<Button type="primary" htmlType="submit">
								提交
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
    </div>
  )
}

export default ProductAdd
