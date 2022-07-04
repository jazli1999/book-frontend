import {
  Col, Row, Space, Divider, Input, Button,
} from 'antd';
import React, { useState } from 'react';
import WhiteTick from '../../../assets/images/white_tick.svg';
import { PayPalBtn } from '../../../components';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

export default function ExchangeDetailsCard(props) {
  const { user: order, current: editable, request } = props;
  const { data, isSuccess } = useGetUserInfoQuery(props.user.userId);
  let username;
  if (isSuccess) {
    username = `${data.firstName} ${data.lastName}`;
  }
  const fee = order.wishList.length * 0.5;
  const status = order.status;
  const paid = Object.prototype.hasOwnProperty.call(order.payment, 'orderId');
  const chosenBooks = [
    {
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isFavorite',
    },
    {
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      mark: 'isFavorite',
    },
  ];

  return (
    <div style={{ padding: '0px 30px 0px 10px' }}>
      <h2 style={{ marginLeft: '5px' }}>{username}</h2>
      <Books books={chosenBooks} editable={editable && (status == 1 && request || status == 2 && !request)} />
      <Payment fee={fee} disabled={status < 3} completed={paid} editable={editable && status == 3} />
      <Track disabled={status < 4} code={order.trackingCode} editable={editable && status == 4} />
    </div>
  );
}

function Books(props) {
  const { books } = props;
  return (
    <div className="rounded-container" style={{ paddingTop: '3px' }}>
      <span className="comment">She wants:</span>
      <br />
      <Space>
        {
          books.map((book) => (
            <img src={book.cover} alt="cover" style={{ height: '100px', width: '70px', objectFit: 'cover' }} />
          ))
        }
      </Space>

    </div>
  );
}

function Payment(props) {
  const { fee, disabled, completed, editable } = props;

  const [isCompleted] = useState(completed);
  return (
    <div className={`rounded-container${disabled ? ' disabled' : ''}`}>
      <div style={{ margin: '5px 0px' }}>
        <Row gutter={2}>
          <Col span={19}>
            <h4 style={{ margin: '5px 0px 3px 0px' }}>Deposit</h4>
            <p className="comment">
              Deposit will be returned once the other one confirms receiving your book(s)
            </p>
          </Col>
          <Col span={5} className="vertical-center">
            <span className="fee">
              5.00 €
            </span>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col span={19}>
            <h4 style={{ margin: '2px 0px 3px 0px' }}>Transaction Fee</h4>
            <p className="comment">
              We take 0.5 € per book you exchange Premium members can exchange for free!
            </p>
          </Col>
          <Col span={5} className="vertical-center">
            <span className="fee">
              {fee.toFixed(2)} €
            </span>
          </Col>
        </Row>
        <Divider style={{ margin: '2px 0px 7px 0px' }} width={2} />
        <Row className="vertical-center">
          <Col span={16}>
            {isCompleted
              && (
                <div style={{ display: 'flex' }}>
                  <h5 style={{ marginBottom: '0px' }}>Payment Completed</h5>
                  <Tick style={{ display: 'inline' }} />

                </div>
              )}
            {
              !isCompleted
              && (
                <div className="vertical-center">
                  <h5 style={{ marginBottom: '0px' }}>
                    Payment Pending
                  </h5>
                  {
                    editable && <PayPalBtn amount={fee + 5} />
                  }
                </div>
              )
            }
          </Col>
          <Col span={8} className="fee">
            <span style={{ fontSize: '8pt' }}>Total</span>
            {' '}
            <br />
            <span style={{ fontWeight: 700 }}>
              {(fee + 5).toFixed(2)} €
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function Tick() {
  const containerStyle = {
    background: '#658e49',
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginLeft: '10px',
  };
  return (
    <span style={containerStyle}>
      <img alt="completed" src={WhiteTick} style={{ width: '12px', marginTop: '1px' }} />
    </span>
  );
}

function Track(props) {
  const { disabled, code, editable } = props;
  return (
    <div className={`rounded-container${disabled ? ' disabled' : ''}`}>
      <div style={{ margin: '8px 0px' }}>
        <h4>Tracking Code</h4>
        {(!code && editable) &&
          <div className='vertical-center'>
            <Input style={{ flex: '1 1 auto', height: '35px' }} />
            <Button type="primary" className="btn-inline">Confirm</Button>
          </div>
        }
        {
          (!code && !editable) &&
          'Tracking code not uploaded yet'
        }
      </div>
    </div>
  );
}
