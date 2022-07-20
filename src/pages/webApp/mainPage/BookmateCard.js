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
    console.log('div clicked: ', userId);
    navigate(`/app/users/${userId}`);
  };

  const availableList = [];
  bookmateData.bcCover.forEach((item, index) => {
    availableList.push({ cover: bookmateData.bcCover[index], mark: bookmateData.bcMark[index] });
  });

  // availableList.sort((a, b) => b.mark - a.mark);

  const wishList = [];
  bookmateData.wsCover.forEach((item, index) => {
    wishList.push({ cover: bookmateData.wsCover[index], mark: bookmateData.wsMark[index] });
  });

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
      onClick={() => { handleUserDetailClick('62c00c2c7bb8a50fac4ac677'); }}
      style={cardStyle}
      cover={(
        <div style={shelfStyle}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <BookList title="Available books" books={availableList.slice(0, 4)} isEditable />
            <BookList title="Wish list" books={wishList.slice(0, 4)} isEditable />
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

  const btnStyle = {
    fontWeight: 700,
    marginLeft: '3px',
    fontSize: '9pt',
    position: 'relative',
  };

  const onMatchClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <span style={{ float: 'left' }}>
        <span style={titleStyle}>{props.name}</span>
        <Button
          className="match-btn"
          size="small"
          style={{ height: '22px', position: 'relative', top: '-2px' }}
          onClick={onMatchClick}
          icon={<PlusOutlined style={{ fontSize: '9pt', position: 'relative'}} />}
          type="primary"
          ghost
        >
          <span style={btnStyle}>Match</span>
        </Button>
        <p style={bioStyle}>{props.description}</p>
      </span>
      <span style={scoreColStyle}>{props.score}</span>
    </div>
  );
}

function BookList(props) {
  return (
    <Space size={1} direction="vertical" style={{ width: '100%' }}>
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
