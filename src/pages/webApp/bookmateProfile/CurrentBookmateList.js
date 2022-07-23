import { useState } from 'react';
import {
  Card, Row, Col, List, Divider, Empty, Button,
} from 'antd';
import { useNavigate } from 'react-router';
import dummyData from '../dummyData';
import MessageSection from './MessageSection';

import {
  useGetDialogMutation
} from '../../../slices/message.api.slice';

import {
  useGetUserInfoQuery,
} from '../../../slices/user.api.slice';


function CurrentBookMateList() {
  const [focus, setFocus] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [userId, setId] = useState(null);
  const [bookmateData, setBookmateData] = useState(null);
  // const [dialog, setDialog] = useState([]);

  const { data: userInfo, isSuccess } = useGetUserInfoQuery();
  // const [getDialogBackend] = useGetDialogMutation();

  const navigate = useNavigate();

  const toProfile = (id) => {
    navigate(`/app/users/${id}`);
  };

  // const getDialog =(id)=>{    
  //   const dialog_req ={ "senderId": userId, "receiverId": id}
  //   getDialogBackend(JSON.stringify(dialog_req)).then((resp)=>{
  //     const new_dialog = JSON.parse(resp.data)
  //   });
  // }
  if(isSuccess && !initialized){
    setId(userInfo._id)
    const hasBookmates = Object.prototype.hasOwnProperty.call(userInfo, 'bookmates');
    if( hasBookmates){
      const bookmate_array = [];
      bookmate_array.push({"name": "Chloe", "description": "Love Reading", "id": "62db45b72631179b98593369"});
      for(let i in userInfo.bookmates){        
         const { data: bookmateInfo, isBookmateSuccess } = useGetUserInfoQuery(i);
         bookmate_array.push({"name": "Chloe", "description": "Love Reading", "id": "62db45b72631179b98593369"})
      }
      setBookmateData(bookmate_array);
    }
    else{
      setBookmateData([]);
    }
    setInitialized(true);
  }
  return (
    <div>
      <Row>
        <Col span={8}>
          <h1>Your Bookmates</h1>
          <List
            itemLayout="vertical"
            loading = {!initialized}
            dataSource={bookmateData}
            renderItem={(item) => (
              <div>
                <Card
                  style={{
                    background: '#fbfdfb', padding: '10px', border: 'none', margin: '0px', borderRadius: '0px',
                  }}
                  onClick={() => {setFocus(item)  }}
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
              <MessageSection senderId= {userId} receiverId = {focus.id} />
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
