import React from 'react';
import {
  Col, Row, Card, Divider, Avatar, Descriptions, Tabs,
} from 'antd';
import { EllipsisOutlined, MessageOutlined } from '@ant-design/icons';
import './index.less';
import CommentSection from './CommentSection';

const { Meta } = Card;
const { TabPane } = Tabs;

export default function BookmateDetails(props) {
  const { bookmateData } = props;

  return (
    <div>
      <Row gutter={8}>
        <Col span={6}>
          <Card
            style={{
              width: 200,
            }}
            cover={<Avatar size={200} src={bookmateData.imageSrc} />}
            actions={[
              <MessageOutlined key="message" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              title={bookmateData.username}
              description={bookmateData.about}
            />
          </Card>
        </Col>
        <Col span={18}>
          <Descriptions title="User Info">
            <Descriptions.Item label="Username">
              {bookmateData.username}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {bookmateData.country}
            </Descriptions.Item>
            <Descriptions.Item label="City">

              {bookmateData.city}
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="horizontal" />

          <Row>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Book Collection" key="books">
                Content of book collectionContent of book collectionContent of book
                collectionContent of book collectionContent of book collection Content
                of book collectionContent of book collectionContent of book collectionContent
                of book collectionContent of book collection
              </TabPane>
              <TabPane tab="Comments" key="comments">
                <CommentSection />
              </TabPane>
            </Tabs>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
