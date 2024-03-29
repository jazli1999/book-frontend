import React from 'react';
import {
  Col, Row, Divider, Descriptions, Tabs,
} from 'antd';
import { useParams } from 'react-router';
import { useGetBookInfoQuery } from '../../../slices/book.api.slice';
import UserList from './UserList';

const { TabPane } = Tabs;

export default function BookDetails() {
  const { isbnUrl } = useParams();

  const { data, isSuccess } = useGetBookInfoQuery(isbnUrl);
  let isbn;
  let authors;
  let title;
  let image;
  let hasDescription;
  let description;
  let categories;
  if (isSuccess) {
    isbn = data.ISBN;
    title = data.title;
    authors = data.authors;
    image = data.image;
    if (data.description) {
      hasDescription = true;
      description = data.description;
    }
    categories = data.categories;
  }

  return (
    <div>
      <Row gutter={14}>
        <Col span={4}>
          <img alt="book cover" src={image} />
        </Col>
        <Col span={12}>
          <Descriptions title={title} column="2">
            <Descriptions.Item label="ISBN">{isbn}</Descriptions.Item>
            <Descriptions.Item label="Author/s">{authors?.join(', ')}</Descriptions.Item>
            <Descriptions.Item label="Categories">{categories?.join(', ')}</Descriptions.Item>
            <Descriptions.Item label="Description">{hasDescription ? description : 'No description available!'}</Descriptions.Item>
          </Descriptions>
          <Divider orientation="horizontal" />

        </Col>

        <Col span={6}>
          <Divider orientation="vertical" />

          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Book Owners" key="owners">
              <UserList isbn={isbnUrl} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
