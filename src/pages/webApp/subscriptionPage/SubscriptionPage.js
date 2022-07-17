import { Col, Row, Card, Space, Typography, message } from 'antd';
import './index.less';
import { useState, useEffect } from 'react';
import { PayPalBtn } from '../../../components';

import {
  useGetSubscriptionInfoMutation,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from '../../../slices/subscription.api.slice';

import {
  useGetUserInfoQuery
} from '../../../slices/user.api.slice';

const { Title } = Typography;
function SubscriptionPage() {
    
  const onStart = ()=> {
    const [initialized, setInitialized] = useState(false);
    let userSuccess= false;
    useEffect(()=>{
      const { data: userInfo, isSuccess } = useGetUserInfoQuery();
      userSuccess = isSuccess;
    }, []);

    let hasSubscription;
    let subSuccess;
    useEffect(()=>{
      useGetSubscriptionInfoMutation(userInfo._id).then((resp)=>{
          hasSubscription = resp.data.isPremium;
          subSuccess=true;
      });
      setInitialized(true);
    }, [userSuccess]);
  };
  
  /**
  useEffect(()=>{
    if(isSuccess){
      useGetSubscriptionInfoMutation(userInfo._id).then((resp)=>{
          const hasSubscription = resp.data.isPremium;
          const subSuccess=true;
      });
    }
  });
   
  let hasSubscription;
  let subSuccess;
  
  console.log(userInfo);
  if( isSuccess){
    useGetSubscriptionInfoMutation(userInfo._id).then((resp) => {
        hasSubscription = resp.data.isPremium;
        subSuccess=true;
    });
  } 
  let newInfo;
  if (subSuccess) {
    newInfo = { id:userInfo._id, model:'monthly'};
    if ( hasSubscription){
        console.log("Hi there");
        useUpdateSubscriptionMutation(newInfo);
        //upSuccess = true;
      }
      else{
        console.log("No there");
        useCreateSubscriptionMutation(newInfo);
        //crSuccess = true;
    }
  }
  */

    
  
  
  const onApproveMonth = (data, actions) => {
    actions.order.capture().then(() => {
      message.success('Payment completed');
      newInfo ={ id:userInfo._id, model:'monthly'}
      if ( hasSubscription){
        useUpdateSubscriptionMutation(newInfo);
      }
      else{
        useCreateSubscriptionMutation(newInfo);
      }        
    });
  };

  const onApproveYear = (data, actions) => {
    actions.order.capture().then(() => {
      message.success('Payment completed');
      newInfo ={ id:userInfo._id, model:'yearly'}
      if ( hasSubscription){
        useUpdateSubscriptionMutation(newInfo);
      }
      else{
        useCreateSubscriptionMutation(newInfo);
      }        
    });
  };

  const onError = (data, actions) => {
    message.error('Something went wrong, please try again');
    return actions.order.capture();
  };

  return (
    <div id="ad">
      <div>
        <Title style={{color: "white"}} onClick	 ={onStart}>Subscription Plans</Title>
        <Space size = 'large'>
          <Row justify="space-around" align="middle" gutter={30} >
            <Col span={12}>
              <Card title="Monthly" bordered={false}>
                <p>Only 5 Euro</p>
                <p>Valid For a single month</p>
                <p>Get Matching Scores</p>
                <p>No Transaction Fee</p>
                <PayPalBtn
                        amount={5}
                        onApprove={onApproveMonth}
                        onError={onError}
                />
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Yearly" bordered={false}>
                <p>40 Euro for Whole Year</p>
                <p>Valid For a year</p>
                <p>Get Matching Scores</p>
                <p>No Transaction Fee</p>
                <PayPalBtn
                        amount={40}
                        onApprove={onApproveYear}
                        onError={onError}
                />
              </Card>
            </Col>
          </Row>
        </Space>  
      </div>
    </div>
      
  );
}

export default SubscriptionPage;
