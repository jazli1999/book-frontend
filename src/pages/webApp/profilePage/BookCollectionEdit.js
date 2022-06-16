import React from "react";
import "antd/dist/antd.css";
import { Col, Row, Divider } from "antd";
import BookCollection from "./BookCollection";
import { BookSearch } from ".";

export default function BookCollectionEdit() {
  return (
    <div>
      <div className="center">
        <h2>
          <b> Edit Your Book Collection </b>
        </h2>
      </div>
      <Divider type="horizontal" orientationMargin="100px" />
      <Row>
        <Col span={15}>
          <BookSearch />{" "}
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={8}>
          <BookCollection isEditable={false} />
        </Col>
      </Row>
    </div>
  );
}
