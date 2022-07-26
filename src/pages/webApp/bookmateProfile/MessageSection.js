import { useState, useEffect } from 'react';
import {
  Card, Space, Input, Layout,List,
} from 'antd';
import { useNavigate } from 'react-router';
import MessageCard from '../../../components/MessageCard';

import {
  useGetDialogMutation,
  useSendMessageMutation
} from '../../../slices/message.api.slice';



const { Content, Footer } = Layout;
function MessageSection(props) {
    const {senderId, receiverId} = props;
    const [message, setMessage] = useState([]);
    const [dialog, setDialog] = useState('');
    const [getDialog] = useGetDialogMutation();
    const [sendMessage] = useSendMessageMutation();
    const [initialized, setInitialized] = useState(false);

    const onEnter = (text) => {
        const data = {"senderId": senderId, "receiverId":receiverId, "message":text};
        if (text !== ""){
            sendMessage(data);
            setMessage('');
            const new_message = {"user": senderId, "sender": senderId, "receiver":receiverId, "message":text};
            setDialog( [...dialog, new_message ]);
        }
    }
    const onUpdate = () =>{
        const data = {"senderId": senderId, "receiverId":receiverId};
        getDialog(data).then((resp)=>{
            setDialog( resp.data );
        });
    }
    useEffect( () =>{
        if(!initialized){
            const data = {"senderId": senderId, "receiverId":receiverId};
                getDialog(data).then((resp)=>{
                    setDialog( resp.data );
                });
                setInitialized(true);
            }

    }, []);

    return(
        <Space  direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div>
                <List
                itemLayout="vertical"
                size="default"
                pagination = {false}
                dataSource={dialog}
                renderItem={(item) => <MessageCard user={props.senderId} sender={item.sender}
                                                 receiver={item.receiver} message={item.message} />}
                /> 
            </div>
            <div style={{marginTop:'auto', textAlign: 'center'}}>
                <Input value = {message} onChange={(e)=>setMessage(e.target.value) } 
                onPressEnter={(e)=> { onEnter(e.target.value);  onUpdate()  } }/>
            </div>
        </Space>
    );
}

export default MessageSection;