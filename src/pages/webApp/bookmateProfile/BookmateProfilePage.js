import React, { useState } from 'react';
import {
  Spin, Space, Tabs, Row, Col, Button, Modal,
} from 'antd';
import { useParams, useNavigate } from 'react-router';

import { ManOutlined, WomanOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';
import { useSendFriendRequestMutation } from '../../../slices/bookmate.api.slice';
import BookList from '../../../components/BookList';
import CommentSection from './CommentSection';

import DefaultCover from '../../../assets/images/default-cover.jpg';

import './index.less';

const getBookList = (books, ex) => {
  const bookList = [];
  for (const [index, book] of books.entries()) {
    bookList.push({
      title: book.title,
      author: book.authors[0],
      image: book.image || DefaultCover,
      exchangeable: ex ? ex[index] : false,
    });
  }
  return bookList;
};

export default function BookmateProfilePage() {
  const { id } = useParams(); // retrieve the id  dynamic params from the current URL
  const { TabPane } = Tabs;
  const { confirm } = Modal;
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [sendFriRequest] = useSendFriendRequestMutation();

  const navigate = useNavigate();

  const createOrder = () => {
    navigate(`/app/orders/create/${id}`);
  };

  // send friendRequest here, the decline&accept will be in the message page
  // check if already a friend

  const operations = (
    <Button type="primary" onClick={createOrder}>
      Request Exchange
    </Button>
  );

  const { data: user, isSuccess, isFetching } = useGetUserInfoQuery(id);
  const { data: cUser, isSuccess: cSuccess } = useGetUserInfoQuery();

  const sendFriendRequest = () => {
    const requestBody = { userId: id };
    console.log(requestBody);
    sendFriRequest(requestBody).then(() => {
      setAlreadySent(true);
    });
  };

  const onMatchClick = () => {
    console.log('click success');
    confirm({
      title: `Send friend request to ${user.firstName}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Send',
      okType: 'primary',
      onOk() {
        sendFriendRequest();
        console.log('request sent!');
      },
    });
  };

  if (cSuccess && !initialized) {
    const index = cUser.bookmates.indexOf(id);
    if (index !== -1) {
      setAlreadyFriend(true);
    }

    const sentIndex = cUser.bmSent.indexOf(id);
    if (sentIndex !== -1) {
      setAlreadySent(true);
    }

    setInitialized(true);
    // console.log(cUser);
  }

  return (
    <div>
      {isFetching && <Spin />}
      {isSuccess
        && (
          <div>
            <div style={{ textAlign: 'center' }}>
              <h1
                className="vertical-center"
                style={{ justifyContent: 'center', position: 'relative', left: '40px' }}
              >
                {user.firstName}
                {' '}
                {user.lastName}
                {user.gender === 'female'
                  ? <WomanOutlined style={{ color: '#658e49', marginLeft: '5px' }} />
                  : <ManOutlined style={{ color: '#658e49', marginLeft: '5px' }} />}
                {
                    (!alreadyFriend && !alreadySent) && (
                      <Button type="primary" onClick={onMatchClick} size="default" className="match-btn" ghost>Match</Button>
                    )
}
              </h1>
              <div style={{ width: '600px', textAlign: 'center', margin: '15px auto 0px auto' }}>
                <Space size={50}>
                  <Space size="large">
                    <span className="label">Country</span>
                    <span>{user.address?.country || '-'}</span>
                  </Space>
                  <Space size="large">
                    <span className="label">State</span>
                    <span>{user.address?.state || '-'}</span>
                  </Space>
                  <Space size="large">
                    <span className="label">City</span>
                    <span>{user.address?.city || '-'}</span>
                  </Space>
                </Space>
                <span style={{ display: 'inline-block', width: '350px', margin: '15px auto 0px auto' }}>{user.bio}</span>
              </div>
            </div>

            <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={alreadyFriend && operations}>
              <TabPane style={{ padding: '0px 15px' }} tab="Book Lists" key="books">
                <Row gutter={20}>
                  <Col span={12}>
                    <h4 style={{ marginBottom: '-20px' }}>
                      {user.firstName}
                      's Book Collection
                    </h4>
                    <BookList
                      bookList={getBookList(user.bookCollection, user.exchangeableCollection)}
                      column={3}
                      pageSize={9}
                    />
                  </Col>
                  <Col span={12}>
                    <h4 style={{ marginBottom: '-20px' }}>
                      {user.firstName}
                      's Wish List
                    </h4>
                    <BookList bookList={getBookList(user.wishList)} column={3} pageSize={9} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Comments" key="comments">
                <CommentSection userId= {user._id}/>
              </TabPane>
            </Tabs>
          </div>
        )}
    </div>
  );
}
