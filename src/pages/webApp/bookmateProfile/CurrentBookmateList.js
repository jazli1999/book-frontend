import { useState } from 'react';
import {
  Card, Row, Col, List, Divider, Empty, Button,
} from 'antd';
import { useNavigate } from 'react-router';
import dummyData from '../dummyData';

function CurrentBookMateList() {
  const [focus, setFocus] = useState(null);
  const navigate = useNavigate();

  const toProfile = (id) => {
    navigate(`/app/users/${id}`);
  };
  return (
    <div>
      <Row>
        <Col span={8}>
          <h1>Your Bookmates</h1>
          <List
            itemLayout="vertical"
            dataSource={dummyData.bookmateData}
            renderItem={(item) => (
              <div>
                <Card
                  style={{
                    background: '#fbfdfb', padding: '10px', border: 'none', margin: '0px', borderRadius: '0px',
                  }}
                  onClick={() => setFocus(item)}
                  hoverable
                >
                  <h3 style={{ marginBottom: '0px' }}>{item.name}</h3>
                  {item.description}
                </Card>
                <Divider style={{ margin: '0px' }} />
              </div>
            )}
          />
        </Col>
        <Col span={16}>
          {focus && (
            <div>
              <h2>{focus.name}</h2>
              <Button
                className="match-btn"
                type="primary"
                onClick={() => toProfile(focus.id)}
                ghost
              >
                Profile
              </Button>
            </div>
          )}
          {!focus && (
            <div style={{
              height: '80%', width: '100%', textAlign: 'center', marginTop: '50px',
            }}
            >
              <h3>Click on a bookmate and see your messages!</h3>
              <Empty description="" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CurrentBookMateList;
