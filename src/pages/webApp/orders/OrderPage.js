import React, { useState } from 'react';
import {
  Button, message, Steps, Col, Row, Space,
} from 'antd';
import { useGetOrderQuery } from '../../../slices/order.api.slice';
import ExchangeDetailsCard from './ExchangeDetailsCard';

import './index.less';

export default function OrderPage() {
  const [current, setCurrent] = useState(0);
  const { data, isSuccess } = useGetOrderQuery('62c30d2ac65cae98b1d7c6c0');

  const { Step } = Steps;
  const steps = [
    { title: <div>Exchange Requested</div>, icon: <StepLabel number={1} /> },
    { title: <div>Confirm Request</div>, icon: <StepLabel number={2} /> },
    { title: <div>Deposit Payment</div>, icon: <StepLabel number={3} /> },
    { title: <div>Ship Your Books</div>, icon: <StepLabel number={4} /> },
    { title: <div>Confirm Receipt</div>, icon: <StepLabel number={5} /> },
    { title: <div>Review Exchange</div>, icon: <StepLabel number={6} /> },
    // { title: '', icon: <span /> },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  let status;
  if (isSuccess) {
    status = Math.min(data.requester.status, data.responder.status);
  }
  return (
    <div>
      {isSuccess
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
                    user={data.requester}
                    current={data.reqId === data.requester.userId}
                    request
                    status={status}
                  />
                </Col>
                <Col span={12}>
                  <ExchangeDetailsCard
                    user={data.responder}
                    current={data.reqId === data.responder.userId}
                    status={status}
                  />
                </Col>
              </Row>
              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>
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
