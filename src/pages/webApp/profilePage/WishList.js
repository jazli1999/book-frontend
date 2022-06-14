import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row, Divider,Button } from "antd";
import "../index.less";
import { EditOutlined } from '@ant-design/icons';


const { Meta } = Card;

export default function WishList() {
  return (  <div>

    <div className="center" >
    <h3><b>Wishlist  </b><Button type="primary" shape="round" icon={ <EditOutlined />} size="small" style={{width:'100px'}} > Edit
      </Button></h3>
</div>
               
<div className="site-card-wrapper">
  <Row gutter={8}>
    <Col span={12}>
      <Card
        cover={
          <img
            style={ { width:'200px', height:'250px'}}
            alt="example"
            src="https://m.media-amazon.com/images/I/516Hq7qbc0L.jpg"
          />
        }
      >
        <Meta title="Book name" description="This is the description" />
      </Card>
    </Col>
    <Col span={12}>
      <Card
        cover={
          <img
          style={ { width:'200px', height:'250px'}}
            alt="example"
            src="https://media1.popsugar-assets.com/files/thumbor/JWgHnBeDTd9SDUmjXKr4oYvqELs/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2021/05/19/856/n/1922283/2130104860a567e911deb2.99901336_/i/best-books-on-booktok.jpg"
          />
        }
      >
        <Meta title="Book name" description="This is the description" />
      </Card>
    </Col>

    <Divider type="vertical" />

  </Row>
</div>
</div>
);
}
