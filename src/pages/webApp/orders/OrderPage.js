import React, { useState } from 'react';
import './index.less';

import {
  Button, message, Steps, Col, Row,
} from 'antd';

import ExchangeDetailsCard from './ExchangeDetailsCard';

const { Step } = Steps;
const steps = [
  {
    title: 'Exchange Requested',
    // content: <ExchangeDetailsCard />,
    description: 'Exchange request is received.',
  },
  {
    title: 'Confirm Request',
    // content: 'Confirm exchange request',
    description: 'Confirm exchange request.',
  },
  {
    title: 'Deposit Payment',
    // content: 'Deposit Payment',
    description: 'This is a description.',
  },
  {
    title: 'Ship Your Books',
    // content: 'Book shipment',
    description: 'Ship the requested book/s.',
  },
  {
    title: 'Review Exchange',
    // content: 'Review Exchange',
    description: 'Your opinion about the other side.',
  },
];

export default function OrderPage() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Row align="top">
      <Col span={6}>
        <Steps current={current} direction="vertical" size="small">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>

      </Col>

      <Col span={18}>
        <div style={{ padding: '0px 15px' }}>
          <h1>Exchange Order Overview</h1>
        </div>
        <Row>
          <Col span={12}>
            <ExchangeDetailsCard />

          </Col>
          <Col span={12}>
            <ExchangeDetailsCard />

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
  );
}
