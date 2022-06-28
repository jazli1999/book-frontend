import React from "react";
import "antd/dist/antd.css";
import { Col, Row, Divider } from "antd";
import BookSearch from "./BookSearch";
import dummyData from "../dummyData";
import BookList from "./BookList";


export default function BookListEdit(props) {
  const { bookList } = dummyData;
  
  return (
    <div>
      <div >
      
      </div>
      <Divider type="horizontal" orientationMargin="100px" />
      <Row>
        <Col span={15}>
          <BookSearch />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={8}>
        <BookList title="Book Collection" bookList={bookList} isEditable={false}/>
        </Col>
      </Row>
    </div>
  );
}
