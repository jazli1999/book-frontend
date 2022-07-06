import React, { useState } from 'react';
import {
  Steps, Col, Row, Space,
} from 'antd';
import { useGetOrderQuery } from '../../../slices/order.api.slice';
import ExchangeDetailsCard from './ExchangeDetailsCard';

import './index.less';

export default function OrderPage() {
  const { data, isSuccess } = useGetOrderQuery('62c30d2ac65cae98b1d7c6c0');
  const [updated, setUpdated] = useState(false);
  const [newStep, setNewStep] = useState(0);
  const { Step } = Steps;
  const steps = [
    { title: <div>Exchange Requested</div>, icon: <StepLabel number={1} /> },
    { title: <div>Confirm Request</div>, icon: <StepLabel number={2} /> },
    { title: <div>Deposit Payment</div>, icon: <StepLabel number={3} /> },
    { title: <div>Ship Your Books</div>, icon: <StepLabel number={4} /> },
    { title: <div>Confirm Receipt</div>, icon: <StepLabel number={5} /> },
    { title: <div>Review Exchange</div>, icon: <StepLabel number={6} /> },
  ];

  const updateSteps = (isReq, step) => {
    const otherStep = isReq ? data.responder.status : data.requester.status;
    setNewStep(Math.min(step, otherStep) - 1);
    setUpdated(true);
  };

  let status;
  if (isSuccess) {
    status = Math.min(data.requester.status, data.responder.status);
    console.log(status);
  }
  return (
    <div>
      {isSuccess
        && (
          <Row align="top">
            <Col span={6} style={{ paddingTop: '45px' }}>
              <Steps current={updated ? newStep : status - 1} direction="vertical">
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
                    user={data.requester}
                    current={data.reqId === data.requester.userId}
                    status={status}
                    updateSteps={updateSteps}
                    request
                  />
                </Col>
                <Col span={12}>
                  <ExchangeDetailsCard
                    user={data.responder}
                    current={data.reqId === data.responder.userId}
                    updateSteps={updateSteps}
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
