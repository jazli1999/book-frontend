import React from 'react';
import { Row, Col } from 'antd';

import ShowCase from './ShowCase';
import LoginPanel from './LoginPanel';

function StartPage() {
  return (
    <div
      id="startPage"
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col span={16}>
          <ShowCase />
        </Col>
        <Col span={8}>
          <LoginPanel />
        </Col>
      </Row>
    </div>
  );
}

export default StartPage;
