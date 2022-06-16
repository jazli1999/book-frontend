import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row, Avatar, Divider } from "antd";
import "../index.less";
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;


export default function BookmateCard(props) {
  const bookmateData = props.bookmateData;
  const navigate = useNavigate();


  const handleUserDetailClick = (event,userId) => {
    // 👇️ refers to the div element
    console.log('div clicked: ', userId);
    navigate("user/profile/" + userId)
  };

  return (
    <a  onClick={event => handleUserDetailClick(event, '1')}>

    <div className="site-card-wrapper" > 
      <Row gutter={8}>
        <Col span={8}>
          <Card
            
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta title="Book0" />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta title="Book1" />
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta title="Book1" />
          </Card>
        </Col>
        <Divider type="horizontal" />

        <Meta
          avatar={<Avatar src={bookmateData.imageSrc} />}
          title={bookmateData.name}
          description={bookmateData.descripton}
        />
      </Row>
    </div>
    </a>
  );
}
