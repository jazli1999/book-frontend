import React from 'react';
import {
  Row, Col, List, Avatar,
} from 'antd';

import ShowCase from './ShowCase';
import { Logo } from '../../components';
import Yanjie from '../../assets/images/team/Yanjie.png';
import Ke from '../../assets/images/team/Ke.png';
import Arda from '../../assets/images/team/Arda.png';
import Eren from '../../assets/images/team/Eren.png';

function AboutUs() {
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
          <div id="loginPanel">
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Logo />
            </div>
            <a style={{ float: 'right', fontWeight: 'bold' }} href="/">To the app →</a>
            <div className="header-0" style={{ margin: '20px 0px' }}>
              Our Team
            </div>
            <List
              grid={{ column: 2, gutter: [0, 20] }}
              dataSource={[
                { pic: Yanjie, name: 'Yanjie Li' },
                { pic: Ke, name: 'Ke Chen' },
                { pic: Arda, name: 'Arda Yüksel' },
                { pic: Eren, name: 'Eren Gülüm' },
              ]}
              renderItem={(item) => <Member {...item} />}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

function Member(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Avatar src={props.pic} size={150} />
      <h3 style={{ marginBottom: '0px', marginTop: '5px' }}>{props.name}</h3>
      <span>Informatics</span>
    </div>
  );
}

export default AboutUs;
