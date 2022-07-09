import React, { useState } from "react";
import "antd/dist/antd.css";
import BookSearchResult from "./BookSearchResult";
import dummyData from "../dummyData";
import { Button, Col, Form, Input, Row } from "antd";

const BookSearch = () => {
  const [results, setResults] = useState([]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    //make a call to service instead of using dummy data
    const dummyResults = dummyData.bookList.slice(0, 5);
    setResults(dummyResults);
  };

  const [form] = Form.useForm();

  const getFields = () => {
    const children = [];

    children.push(
      <Col span={10} key={1}>
        <Form.Item name="isbn" label="ISBN">
          <Input />
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
          <Input />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key={4}>
        <Form.Item name="publisher" label="Publisher">
          <Input />
        </Form.Item>
      </Col>
    );
    return children;
  };

  return (
    <div>
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

      <BookSearchResult resultData={results} />
    </div>
  );
};

export default BookSearch;
