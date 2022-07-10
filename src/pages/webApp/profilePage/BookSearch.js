import React, { useState } from "react";
import "antd/dist/antd.css";
import BookSearchResult from "./BookSearchResult";
import dummyData from "../dummyData";
import { Button, Col, Form, Input, Row, message } from "antd";
import { useGetBookMutation } from "../../../slices/book.api.slice";

const BookSearch = () => {
  const [results, setResults] = useState();
  const [getBook] = useGetBookMutation();


  const onFinish = (values) => {
    console.log('val',values)
    getBook(JSON.stringify(values)).then((resp)=> {
      if (resp.data.status === 200) {
        console.log('Returned results: ',resp.data)
        setResults(JSON.parse(resp.data.data).searchResult);
      } else {
        message.error('Something went wrong, please try again');
      }
    });
  
    console.log('results');
    console.log(results)

    setResults(results);
  };

  const [form] = Form.useForm();

  const getFields = () => {
    const children = [];

    children.push(
      <Col span={10} key={1}>
        <Form.Item name="isbn" label="ISBN">
          <Input />
        </Form.Item>
      </Col>,
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
}

export default BookSearch;
