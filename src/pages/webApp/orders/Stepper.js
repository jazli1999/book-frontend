import React from "react";
import "antd/dist/antd.css";
import "./index.less";
import { useState } from "react";
import { Button, message, Steps } from 'antd';
import { Col, Row, Divider } from 'antd';
import ExchangeDetailsCard from "./ExchangeDetailsCard";

const { Step } = Steps;
const steps = [
  {
    title: 'Exchange Requested',
    content: <ExchangeDetailsCard/>,
    description:"Exchange request is received."
  },
  {
    title: 'Confirm Request',
    content: 'Confirm exchange request',
    description:"Confirm exchange request."
  },
  {
    title: 'Deposit Payment',
    content: 'Deposit Payment',
    description:"This is a description."
  },
  {
    title: 'Ship Your Books',
    content: 'Book shipment',
    description:"Ship the requested book/s."
  },
  {
    title: 'Review Exchange',
    content: 'Review Exchange',
    description:"Your opinion about the other side."
  },
];

export default function Stepper() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>

<Row align="top">
        <Col span={5}>
        <Steps current={current} direction="vertical" size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} description={item.description} />
        ))}
      </Steps>
         
        </Col>
        <Divider type="vertical" orientationMargin="100px" />

        <Col span={18}>
      <div className="steps-content">{steps[current].content}</div>
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

    </>
  );
};
