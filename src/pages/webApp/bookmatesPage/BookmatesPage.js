import { useState } from 'react';
import {
  Card, Row, Col, List, Divider, Empty,
} from 'antd';
import MessageSection from './MessageSection';

import { useGetCurrentQuery } from '../../../slices/bookmate.api.slice';

import {
  useGetUserInfoQuery,
} from '../../../slices/user.api.slice';

function BookmatesPage() {
  const [focus, setFocus] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [userId, setId] = useState(null);
  // const [dialog, setDialog] = useState([]);

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
    setInitialized(true);
  }
  return (
    <div>
      <Row gutter={30}>
        <Col span={10}>
          <h1>Your Bookmates</h1>
          <List
            itemLayout="vertical"
            loading={!initialized}
            dataSource={currentBookmates}
            renderItem={(item) => (
              <div>
                <Card
                  style={{
                    background: '#fbfdfb', padding: '10px', border: 'none', margin: '0px', borderRadius: '0px',
                  }}
                  onClick={() => { setFocus(item); }}
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
          {focus && (
            <div id="message-container">
              <MessageSection name={`${focus.firstName} ${focus.lastName}`} senderId={userId} receiverId={focus._id} />
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
