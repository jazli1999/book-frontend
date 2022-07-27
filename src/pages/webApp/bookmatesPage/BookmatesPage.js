import { useState } from 'react';
import {
  Card, Row, Col, List, Divider, Empty, Button,
} from 'antd';
import MessageSection from './MessageSection';

import { useGetCurrentQuery, useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../../slices/bookmate.api.slice';

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
    console.log(requestBody);
    acpFriRequest(requestBody).then(() => {
      window.location.reload();
    });
  };

  const onDeclineClick = () => {
    const requestBody = { userId: focus._id };
    console.log(requestBody);
    decFriRequest(requestBody).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <Row gutter={30}>
        <Col span={10}>
          <h1>Received Bookmates Requests</h1>
          <List
            itemLayout="vertical"
            loading={!initialized}
            dataSource={bmReceived}
            renderItem={(item) => (
              <div>
                <Card
                  style={{
                    background: '#fbfdfb', padding: '10px', border: 'none', margin: '0px', borderRadius: '0px',
                  }}
                  onClick={() => { setFocus({ rec: true, ...item }); }}
                  hoverable
                >
                  <h3 style={{ marginBottom: '0px' }}>{`${item.firstName} ${item.lastName}`}</h3>
                  {item.bio}
                </Card>
                <Divider style={{ margin: '0px' }} />
              </div>
            )}
          />
          <h1>Your Bookmates</h1>
          <List
            itemLayout="vertical"
            loading={!initialized}
            dataSource={bookmates}
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
            <div>
              <Button type="primary" onClick={onAcceptClick} size="default" className="match-btn" ghost>Accept Friend Request</Button>
              <Button type="danger" onClick={onDeclineClick} size="default" className="match-btn" ghost>Decline Friend Request</Button>
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
