import React from 'react';
import { Col, Row, Divider } from 'antd';
import { useParams } from 'react-router';
import BookSearch from './BookSearch';
import dummyData from '../dummyData';
import BookList from '../../../components/BookList';

export default function BookListEdit() {
  const { bookList } = dummyData; // retrieve real data depends on listType
  const { listType } = useParams(); // retrieve the id  dynamic params from the current URL

  console.log('list type:', listType);

  if ((listType !== 'collection' && listType !== 'wishlist')) {
    return (<div>Wrong request</div>);
  }

  return (
    <div>
      <div />
      <Divider type="horizontal" orientationMargin="10px" />
      <Row>
        <Col span={13}>
          <BookSearch />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={1} />
        <Col span={9}>
          <BookList title={listType === 'collection' ? 'Book Collection' : 'Wish List'} bookList={bookList} isEditable={false} />
        </Col>
      </Row>
    </div>
  );
}
