import {
  Col, Row, Divider, message,
} from 'antd';
import './index.less';
import { PayPalBtn } from '../../../components';

import {
  useGetSubscriptionInfoQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from '../../../slices/subscription.api.slice';

function SubscriptionPage() {
  const [updateSubscription] = useUpdateSubscriptionMutation();
  const [createSubscription] = useCreateSubscriptionMutation();
  const { data, isSuccess } = useGetSubscriptionInfoQuery();

  let hasSubscription;
  if (isSuccess) {
    hasSubscription = data.isPremium;
  }

  const onApproveMonth = (_, actions) => {
    actions.order.capture().then(() => {
      message.success('Payment completed');
      const newInfo = { model: 'monthly' };
      if (hasSubscription) {
        updateSubscription(newInfo);
      } else {
        createSubscription(newInfo);
      }
      window.location.reload();
    });
  };

  const onApproveYear = (_, actions) => {
    actions.order.capture().then(() => {
      message.success('Payment completed');
      const newInfo = { model: 'yearly' };
      if (hasSubscription) {
        updateSubscription(newInfo);
      } else {
        createSubscription(newInfo);
      }
      window.location.reload();
    });
  };

  const onError = (_, actions) => {
    message.error('Something went wrong, please try again');
    return actions.order.capture();
  };

  return (
    <div className="bg" style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
      <h1 style={{ color: 'white' }}>Subscription Plans</h1>
      <div className="vertical-center">
        <Row justify="space-around" align="middle" gutter={30} style={{ margin: 'auto', marginTop: '10px' }}>
          <Col span={12}>
            <div
              className="rounded-container subs-card"
              style={{ textAligh: 'center' }}
            >
              <h3>Monthly Plan</h3>
              <Divider />
              <p>5 Euro Per Month</p>
              <p>Unlimited bookmate recommendations</p>
              <p>Matching scores visible</p>
              <p>No exchange transaction fees</p>
              <Divider style={{ marginBottom: '15px' }} />
              <div className="vertical-center" style={{ justifyContent: 'center' }}>
                <span style={{ display: 'inline-block' }}>Subscribe now with</span>
                <div style={{ width: '100px', display: 'inline-block' }}>
                  <PayPalBtn
                    amount={5}
                    onApprove={onApproveMonth}
                    onError={onError}
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="rounded-container subs-card">
              <h3>Yearly Plan</h3>
              <Divider />
              <p>40 Euro per year</p>
              <p>Unlimited bookmate recommendations</p>
              <p>Matching scores visible</p>
              <p>No exchange transaction fees</p>
              <Divider style={{ marginBottom: '15px' }} />
              <div className="vertical-center" style={{ justifyContent: 'center' }}>
                <span style={{ display: 'inline-block' }}>Subscribe now with</span>
                <div style={{ width: '100px', display: 'inline-block' }}>
                  <PayPalBtn
                    amount={40}
                    onApprove={onApproveYear}
                    onError={onError}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>

  );
}

export default SubscriptionPage;
