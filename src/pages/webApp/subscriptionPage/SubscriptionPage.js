import { Col, Row, Card, Space, Typography, message } from 'antd';
import './index.less';
import { PayPalBtn } from '../../../components';
import {
  useGetUserInfoQuery,
} from '../../../slices/user.api.slice';

import {
  useGetSubscriptionInfoMutation,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from '../../../slices/subscription.api.slice';

const { Title } = Typography;
function SubscriptionPage() {
  const { data: userInfo, isSuccess } = useGetUserInfoQuery();
  let hasSubscription;
  if (isSuccess) {
    message.warn(userInfo)
    hasSubscription = Object.prototype.hasOwnProperty.call(userInfo, 'premium');
  }

  const onApproveMonth = (data, actions) => {
    actions.order.capture().then(() => {
      message.success('Payment completed');
      if ( hasSubscription){
        useUpdateSubscriptionMutation('monthly');
      }
      else{
        useCreateSubscriptionMutation('monthly');
      }        
    });
  };

  const onApproveYear = (data, actions) => {
    actions.order.capture().then(() => {
      message.success('Payment completed');
      if ( hasSubscription){
        useUpdateSubscriptionMutation('yearly');
      }
      else{
        useCreateSubscriptionMutation('yearly');
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
        <Title style={{color: "white"}}>Subscription Plans</Title>
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
