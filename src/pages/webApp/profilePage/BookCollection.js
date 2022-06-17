import React from "react";
import { Card, Col, Row, Divider,Button } from "antd";
import "../index.less";
import { EditOutlined } from '@ant-design/icons';


const { Meta } = Card;

export default function BookCollection() {
  return (  <div>

    <div className="center" >
    <h3><b>Book Collection  </b><Button type="primary" shape="round" icon={ <EditOutlined />} size="small" style={{width:'100px'}} > Edit
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
            src="https://images-na.ssl-images-amazon.com/images/I/41pnExRByHL._SX365_BO1,204,203,200_.jpg"
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
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta title="Book name" description="This is the description" />
      </Card>
    </Col>

  </Row>


  <Divider type="vertical" />

  <Row gutter={8}>
    <Col span={12}>
      <Card
        cover={
          <img
          style={ { width:'200px', height:'250px'}}
            alt="example"
            src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3939/9780393972825.jpg"
          />
        }
      >
        <Meta title="Book name" description="This is the description" />
      </Card>
    </Col>
  

  </Row>

</div>
</div>
);
}
