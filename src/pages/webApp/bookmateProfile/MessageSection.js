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
    const [dialog, setDialog] = useState([]);
    const [getDialog] = useGetDialogMutation();
    const [sendMessage] = useSendMessageMutation();
    const [initialized, setInitialized] = useState(false);

    const onEnter = (text) => {
        const data = {"senderId": senderId, "receiverId":receiverId, "message":text};
        if (text !== ""){
            sendMessage(data);
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
                    console.log(resp.data);
                });
                setInitialized(true);
            }

    }, []);
    if(!initialized){

    }
    return(
        <Layout>
            <Content>
                <List
                itemLayout="vertical"
                size="default"
                pagination={{
                    size: 'small',
                    style: { width: 'fit-content', margin: 'auto' },
                    hideOnSinglePage: true,
                }}
                dataSource={dialog}
                renderItem={(item) => <MessageCard user={props.senderId} sender={item.sender}
                                                 receiver={item.receiver} message={item.message} />}
                /> 
            </Content>
            <Footer style={{ textAlign: 'center', alignSelf:'bottom' }}>
                <Input placeholder="Basic usage" onPressEnter={(e)=> {onEnter(e.target.value); onUpdate()} }/>
            </Footer>
        </Layout>
    );
}

export default MessageSection;