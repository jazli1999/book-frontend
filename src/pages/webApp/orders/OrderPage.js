import {
  Steps, Col, Row, Space,
} from 'antd';
import { useParams } from 'react-router';
import { useGetOrderQuery, useCreateOrderMutation } from '../../../slices/order.api.slice';
import ExchangeDetailsCard from './ExchangeDetailsCard';

import './index.less';

export default function OrderPage(props) {
  const { create } = props;
  const { id } = useParams();
  let order; let
    hasSuccess;
  if (create) {
    order = {
      requester: {
        wishList: [],
        payment: {},
        status: 1,
      },
      responder: {
        userId: id,
        wishList: [],
        payment: {},
        status: 1,
      },
    };
    hasSuccess = true;
  } else {
    const { data, isSuccess } = useGetOrderQuery(id);
    if (isSuccess) {
      hasSuccess = true;
      order = data;
    }
  }
  const { Step } = Steps;
  const steps = [
    { title: <div>Exchange Requested</div>, icon: <StepLabel number={1} /> },
    { title: <div>Confirm Request</div>, icon: <StepLabel number={2} /> },
    { title: <div>Deposit Payment</div>, icon: <StepLabel number={3} /> },
    { title: <div>Ship Your Books</div>, icon: <StepLabel number={4} /> },
    { title: <div>Confirm Receipt</div>, icon: <StepLabel number={5} /> },
    { title: <div>Review Exchange</div>, icon: <StepLabel number={6} /> },
  ];

  const [createOrder] = useCreateOrderMutation();

  const createOrderCall = (books) => {
    order.requester.wishList = books;
    createOrder({ order }).then((returnOrder) => {
      const a = document.createElement('a');
      a.href = `/app/orders/${returnOrder.data._id}`;
      a.click();
    });
  };

  let status;
  if (hasSuccess) {
    status = Math.min(order.requester.status, order.responder.status);
  }

  const updateSteps = (isReq, step) => {
    if (step === 2 || step === 3) {
      window.location.reload();
    } else {
      const otherStep = isReq ? order.responder.status : order.requester.status;
      const newStep = (Math.min(step, otherStep) - 1);
      if (newStep > status - 1) window.location.reload();
    }
  };
  return (
    <div>
      {hasSuccess
        && (
          <Row align="top">
            <Col span={6} style={{ paddingTop: '45px' }}>
              <Steps current={status - 1} direction="vertical">
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} icon={item.icon} />
                ))}
              </Steps>
            </Col>
            <Col span={18}>
              <div style={{ padding: '0px 15px' }}>
                <h1>Exchange Order Overview</h1>
              </div>
              <Row>
                <Col span={12}>
                  <ExchangeDetailsCard
                    user={order.requester}
                    current={order.reqId === order.requester.userId}
                    status={status}
                    updateSteps={updateSteps}
                    bookmateId={order.responder.userId}
                    create={create}
                    createOrder={createOrderCall}
                    request
                  />
                </Col>
                <Col span={12}>
                  <ExchangeDetailsCard
                    user={order.responder}
                    current={order.reqId === order.responder.userId}
                    updateSteps={updateSteps}
                    bookmateId={order.requester.userId}
                    status={status}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
    </div>
  );
}

function StepLabel(props) {
  const { number } = props;
  return (
    <div style={{ marginLeft: '-8px' }} className="vertical-center">
      <Space size={15}>
        <span style={{ fontSize: '15pt', fontWeight: 700 }}>{number}</span>
        <span style={{ fontWeight: 900, fontSize: '22pt' }}>·</span>
      </Space>
    </div>
  );
}
