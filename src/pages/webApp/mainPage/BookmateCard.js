import React, { useState } from 'react';
import {
  Card, Col, Row, Button, Space, Modal,
} from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MarkableCover from './MarkableCover';
import { useSendFriendRequestMutation } from '../../../slices/bookmate.api.slice';

import '../index.less';

export default function BookmateCard(props) {
  const { bookmateData } = props;
  const navigate = useNavigate();
  const { Meta } = Card;

  // console.log(bookmateData);
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
    padding: '15px',
  };

  return (
    <Card
      hoverable
      onClick={() => { handleUserDetailClick(bookmateData.id); }}
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
  // console.log(props);
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const { confirm } = Modal;
  const [sendFriRequest] = useSendFriendRequestMutation();
  const [initialized, setInitialized] = useState(false);

  const index = props.currentUserFriendList.indexOf(props.id);
  if (index !== -1) { // find in the list, already a friend
    setAlreadyFriend(true);
  }

  if (!initialized) {
    const sentIndex = props.alreadySentList.indexOf(props.id);
    if (sentIndex !== -1) {
      setAlreadySent(true);
    }
    setInitialized(true);
  }

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
  };

  const btnStyle = {
    fontWeight: 700,
    marginLeft: '3px',
    fontSize: '9pt',
    position: 'relative',
  };

  const sendFriendRequest = () => {
    const requestBody = { userId: props.id };
    sendFriRequest(requestBody);
  };

  const onMatchClick = (e) => {
    e.stopPropagation();
    confirm({
      title: `Send friend request to ${props.name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Send',
      okType: 'primary',
      onOk() {
        sendFriendRequest();
        console.log('request sent!');
        setAlreadySent(true);
      },
    });
  };

  return (
    <div className="vertical-center" style={{ justifyContent: 'space-between' }}>
      <span>
        <span style={titleStyle}>{props.name}</span>
        {
          (alreadyFriend || alreadySent) && (
          <Button
            disabled
            className="match-btn"
            size="small"
            style={{ height: '22px', position: 'relative', top: '-2px' }}
            onClick={onMatchClick}
            icon={<PlusOutlined style={{ fontSize: '9pt', position: 'relative' }} />}
            type="primary"
            ghost
          >
            <span style={btnStyle}>Match</span>
          </Button>
          )
        }
        { (!alreadyFriend && !alreadySent) && (
          <Button
            className="match-btn"
            size="small"
            style={{ height: '22px', position: 'relative', top: '-2px' }}
            onClick={onMatchClick}
            icon={<PlusOutlined style={{ fontSize: '9pt', position: 'relative' }} />}
            type="primary"
            ghost
          >
            <span style={btnStyle}>Match</span>
          </Button>
        )}
        <p className="bio">{props.description}</p>
      </span>
      <span style={scoreColStyle}>{props.score}</span>
    </div>
  );
}

function BookList(props) {
  return (
    <Space size={1} direction="vertical" style={{ width: '100%' }}>
      <span style={{ fontSize: '9pt' }}>{props.title}</span>
      <Row gutter={8} style={{ height: '100px' }}>
        {props.books.map((book, index) => (
          <Col key={index} span={6}>
            <MarkableCover src={book.cover} mark={book.mark} />
          </Col>
        ))}
      </Row>
    </Space>
  );
}
