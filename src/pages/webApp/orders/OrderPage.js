import React, { useState } from 'react';
import {
  Button, message, Steps, Col, Row,
} from 'antd';
import { useGetOrderQuery } from '../../../slices/order.api.slice';
import ExchangeDetailsCard from './ExchangeDetailsCard';

import './index.less';

const { Step } = Steps;
const steps = [
  { title: 'Exchange Requested' },
  { title: 'Confirm Request' },
  { title: 'Deposit Payment' },
  { title: 'Ship Your Books' },
  { title: 'Review Exchange' },
];

export default function OrderPage() {
  const [current, setCurrent] = useState(0);
  const { data, isSuccess } = useGetOrderQuery('62c30d2ac65cae98b1d7c6c0');

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      {isSuccess &&
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
                <ExchangeDetailsCard user={data.requester} current={data.reqId === data.requester.userId} request />
              </Col>
              <Col span={12}>
                <ExchangeDetailsCard user={data.responder} current={data.reqId === data.responder.userId} />
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
      }
    </div>
  );
}
