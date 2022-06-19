import React from 'react';
import { Row, Col } from 'antd';

import ShowCase from './ShowCase';
import LoginPanel from './LoginPanel';

function StartPage() {
  return (
    <div id="startPage">
      <Row>
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
