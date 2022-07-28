import { useState, useEffect } from 'react';
import { Input, List, Button } from 'antd';
import MessageCard from '../../../components/MessageCard';

import {
  useGetDialogMutation,
  useSendMessageMutation,
} from '../../../slices/message.api.slice';

function MessageSection(props) {
  const { senderId, receiverId } = props;
  const [message, setMessage] = useState([]);
  const [dialog, setDialog] = useState('');
  const [getDialog] = useGetDialogMutation();
  const [sendMessage] = useSendMessageMutation();
  const [initialized, setInitialized] = useState(false);

  const onEnter = async (text) => {
    const data = { senderId, receiverId, message: text.trim() };
    if (data.text !== '') {
      await sendMessage(data);
      setMessage('');
    }
  };

  const update = () => {
    const data = { senderId, receiverId };
    getDialog(data).then((resp) => {
      setDialog(resp.data);
    });
  };

  useEffect(() => {
    const elem = document.getElementById('message-div');
    elem.scrollTop = elem.scrollHeight;
  }, [dialog]);

  if (!initialized) {
    update();
    setInitialized(true);
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="vertical-center">
        <a href={`/app/users/${receiverId}`}>
          <h2 style={{ display: 'inline-block', marginBottom: '0px' }}>{props.name}</h2>
        </a>
        <Button
          className="match-btn"
          type="primary"
          onClick={update}
          ghost
        >
          Refresh
        </Button>
      </div>
      <div
        id="message-div"
        style={{
          paddingRight: '8px', height: '440px', overflowY: 'scroll', marginTop: '10px',
        }}
      >
        <List
          itemLayout="vertical"
          size="default"
          pagination={false}
          dataSource={dialog}
          renderItem={(item) => (
            <MessageCard
              user={props.senderId}
              sender={item.sender}
              receiver={item.receiver}
              message={item.message}
            />
          )}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={async (e) => {
            await onEnter(e.target.value);
            update();
          }}
        />
      </div>
    </div>
  );
}

export default MessageSection;
