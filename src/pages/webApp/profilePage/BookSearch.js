import React from "react";
import "antd/dist/antd.css";
import "./index.less";
import { Button, Col, Form, Input, Row, Select } from "antd";
const { Option } = Select;

const AdvancedSearchForm = () => {
  const [form] = Form.useForm();

  const getFields = () => {
    const children = [];

    children.push(
      <Col span={10} key={1}>
        <Form.Item name="isbn" label="ISBN">
          <Input  />
        </Form.Item>
      </Col>
    );
    children.push(
        <Col span={10} key={2}>
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
        </Col>
      );
      children.push(
        <Col span={10} key={3}>
          <Form.Item name="author" label="Author">
            <Input/>
          </Form.Item>
        </Col>
      );
      children.push(
        <Col span={10} key={4}>
          <Form.Item name="publisher" label="Publisher">
            <Input/>
          </Form.Item>
        </Col>
      );
    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "right",
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const BookSearch = () => (
  <div>
    <AdvancedSearchForm />
    <div className="search-result-list">Search Result List</div>
  </div>
);

export default BookSearch;
