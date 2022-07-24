import React from 'react';
import {
  Spin, Space, Tabs, Row, Col, Button,
} from 'antd';
import { useParams, useNavigate } from 'react-router';

import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';
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

  const navigate = useNavigate();

  const createOrder = () => {
    navigate(`/app/orders/create/${id}`);
  };

  const operations = (
    <Button type="primary" onClick={createOrder}>
      Request Exchange
    </Button>
  );

  const { data: user, isSuccess, isFetching } = useGetUserInfoQuery(id);

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
                <Button type="primary" size="default" className="match-btn" ghost>Match</Button>
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

            <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={operations}>
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
                <CommentSection />
              </TabPane>
            </Tabs>
          </div>
        )}
    </div>
  );
}
