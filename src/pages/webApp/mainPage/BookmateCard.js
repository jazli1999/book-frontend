import React from 'react';
import {
  Card, Col, Row, Button, Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MarkableCover from './MarkableCover';

import '../index.less';

export default function BookmateCard(props) {
  const { bookmateData } = props;
  const navigate = useNavigate();
  const { Meta } = Card;

  const handleUserDetailClick = (userId) => {
    // 👇️ refers to the div element
    console.log('div clicked: ', userId);
    navigate(`user/profile/${userId}`);
  };

  const availableList = [
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isFavorite',
    },
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isFavorite',
    },
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: null,
    },
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: null,
    },
  ];

  const wishList = [
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isAvailable',
    },
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isAvailable',
    },
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isAvailable',
    },
    {
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: null,
    },
  ];

  const shelfStyle = {
    padding: '5px 15px',
    background: '#f5f7f5',
    borderRadius: '15px 15px 0px 0px',
    border: 'solid #d2d4d0',
    borderWidth: '0.5px',
    paddingBottom: '10px',
  };

  const cardStyle = {
    borderRadius: '15px',
    border: 'solid #d2d4d0',
    borderWidth: '1px',
    background: '#fbfdfb',
    margin: '10px',
  };

  const metaStyle = {
    padding: '20px',
  };

  return (
    <Card
      hoverable
      onClick={() => { handleUserDetailClick(1); }}
      style={cardStyle}
      cover={(
        <div style={shelfStyle}>
          <Space direction="vertical">
            <BookList title="Available books" books={availableList} />
            <BookList title="Wish list" books={wishList} />
          </Space>
        </div>
      )}
    >
      <Meta
        title={<CardTitle {...bookmateData} />}
        style={metaStyle}
      />
    </Card>
  );
}

function CardTitle(props) {
  const bioStyle = {
    fontSize: '9pt',
    color: '#323431',
    marginBottom: '0px',
    marginTop: '3px',
  };

  const titleStyle = {
    fontSize: '11pt',
    color: '#323431',
    fontWeight: 700,
    marginBottom: '0px !important',
  };

  const scoreColStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '19pt',
    color: '#80a566',
    fontWeight: 800,
    float: 'right',
  };

  return (
    <div>
      <span style={{ float: 'left' }}>
        <span style={titleStyle}>{props.name}</span>
        <Button className="match-btn" size="small" icon={<PlusOutlined />} type="primary" ghost>
          <span style={{ fontWeight: 600, marginLeft: '3px' }}>Match</span>
        </Button>
        <p style={bioStyle}>{props.description}</p>
      </span>
      <span style={scoreColStyle}>{props.score}</span>
    </div>
  );
}

function BookList(props) {
  return (
    <Space size={1} direction="vertical">
      <span style={{ fontSize: '9pt' }}>{props.title}</span>
      <Row gutter={8}>
        {props.books.map((book, index) => (
          <Col key={index} span={6}>
            <MarkableCover src={book.cover} mark={book.mark} />
          </Col>
        ))}
      </Row>
    </Space>
  );
}
