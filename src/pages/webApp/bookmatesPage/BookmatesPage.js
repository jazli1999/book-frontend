import { useState } from 'react';
import {
  Card, Row, Col, List, Divider, Empty, Button, Space,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import MessageSection from './MessageSection';

import {
  useGetCurrentQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from '../../../slices/bookmate.api.slice';

import {
  useGetUserInfoQuery,
} from '../../../slices/user.api.slice';

function BookmatesPage() {
  const [focus, setFocus] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [userId, setId] = useState(null);
  // const [dialog, setDialog] = useState([]);
  const [bookmates, setBookmates] = useState();
  const [bmReceived, setBmReceived] = useState();
  const [acpFriRequest] = useAcceptFriendRequestMutation();
  const [decFriRequest] = useDeclineFriendRequestMutation();

  // const [getDialogBackend] = useGetDialogMutation();
  const { data: currentBookmates, isSuccess: currentSuccess } = useGetCurrentQuery();
  const { data: userInfo, isSuccess: selfSuccess } = useGetUserInfoQuery();

  // const getDialog =(id)=>{
  //   const dialog_req ={ "senderId": userId, "receiverId": id}
  //   getDialogBackend(JSON.stringify(dialog_req)).then((resp)=>{
  //     const new_dialog = JSON.parse(resp.data)
  //   });
  // }

  if (currentSuccess && selfSuccess && !initialized) {
    setId(userInfo._id);
    setBookmates(currentBookmates.Bookmates);
    setBmReceived(currentBookmates.bmReceived);
    setInitialized(true);
  }

  const onAcceptClick = () => {
    const requestBody = { userId: focus._id };
    acpFriRequest(requestBody).then(() => {
      window.location.reload();
    });
  };

  const onDeclineClick = () => {
    const requestBody = { userId: focus._id };
    decFriRequest(requestBody).then(() => {
      window.location.reload();
    });
  };

  const requestStyle = {
    textAlign: 'center',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    padding: '30px',
  };

  return (
    <div>
      <Row gutter={30}>
        <Col span={10}>
          <h1>Your Bookmates</h1>
          <List
            itemLayout="vertical"
            loading={!initialized}
            dataSource={bmReceived}
            locale={{ emptyText: <span /> }}
            renderItem={(item) => (
              <div>
                <Card
                  style={{
                    background: '#fbfdfb',
                    padding: '10px',
                    border: 'none',
                    margin: '0px',
                    borderRadius: '0px',
                  }}
                  onClick={() => { setFocus({ rec: true, ...item }); }}
                  hoverable
                >
                  <div
                    className="vertical-center"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div>
                      <h3 style={{ marginBottom: '0px', color: '#6f716e' }}>
                        {`${item.firstName} ${item.lastName}`}
                      </h3>
                      <span style={{ color: '#6f716e' }}>{item.bio}</span>
                    </div>
                    <div style={{ marginRight: '10px', fontSize: '20pt', color: '#7ea465' }}>
                      <PlusCircleOutlined />
                    </div>
                  </div>
                </Card>
                <Divider style={{ margin: '0px' }} />
              </div>
            )}
          />
          <List
            itemLayout="vertical"
            loading={!initialized}
            dataSource={bookmates}
            locale={{ emptyText: <div style={{ paddingTop: '20px' }}>No matched bookmates</div> }}
            renderItem={(item) => (
              <div>
                <Card
                  style={{
                    background: '#fbfdfb', padding: '10px', border: 'none', margin: '0px', borderRadius: '0px',
                  }}
                  onClick={() => { setFocus({ rec: false, ...item }); }}
                  hoverable
                >
                  <h3 style={{ marginBottom: '0px' }}>{`${item.firstName} ${item.lastName}`}</h3>
                  {item.bio}
                </Card>
                <Divider style={{ margin: '0px' }} />
              </div>
            )}
          />
        </Col>
        <Col span={14}>
          {focus && !focus.rec && (
            <div id="message-container">
              <MessageSection name={`${focus.firstName} ${focus.lastName}`} senderId={userId} receiverId={focus._id} />
            </div>
          )}
          {focus && focus.rec && (
            <div style={requestStyle}>
              <h2>
                <a href={`/app/users/${focus._id}`}>{`${focus.firstName} ${focus.lastName}`}</a>
                {' '}
                sends you a matching request
              </h2>
              <Space size="large">
                <Button type="primary" onClick={onAcceptClick} size="default">Accept</Button>
                <Button type="danger" onClick={onDeclineClick} size="default" ghost>Decline</Button>
              </Space>
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

export default BookmatesPage;
