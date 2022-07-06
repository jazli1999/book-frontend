import {
  Col, Row, Space, Divider, Input, Button, message,
} from 'antd';
import React, { useState } from 'react';
import WhiteTick from '../../../assets/images/white_tick.svg';
import { PayPalBtn } from '../../../components';
import { useUpdatePaymentMutation, useUpdateTrackingMutation, useConfirmReceiptMutation } from '../../../slices/order.api.slice';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

export default function ExchangeDetailsCard(props) {
  const {
    user: order, current: editable, request, status, updateSteps,
  } = props;
  const { data, isSuccess } = useGetUserInfoQuery(props.user.userId);
  let username;
  if (isSuccess) {
    username = `${data.firstName} ${data.lastName}`;
  }
  const fee = order.wishList.length * 0.5;
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
      <h2 style={{ margin: '5px', fontSize: '13pt' }}>{username}</h2>
      <Books
        books={chosenBooks}
        editable={editable && ((status === 1 && request) || (status === 2 && !request))}
        isReq={request}
        name={username}
        updateSteps={updateSteps}
      />
      <Payment
        fee={fee}
        disabled={status < 3}
        completed={paid}
        editable={editable && status === 3}
        updateSteps={updateSteps}
        isReq={request}
      />
      <Track
        disabled={status < 4}
        code={order.trackingCode}
        editable={editable && status === 4}
        updateSteps={updateSteps}
        isReq={request}
      />
      <Confirmation
        disabled={status < 5 || !editable}
        completed={order.status > 5}
        editable={editable && status === 5}
        updateSteps={updateSteps}
        isReq={request}
        username={username}
      />
    </div>
  );
}

function Confirmation(props) {
  const {
    disabled, editable, isReq, completed, username, updateSteps,
  } = props;
  const [isCompleted, setIsCompleted] = useState(completed);
  /*
   * disabled: hasn't reached this step
   * editable: whether the current logged in user corresponds to the current card
   * isReq: flag sent to backend to note which user's detail to update
   */

  const [confirmReceipt] = useConfirmReceiptMutation();

  const onConfirm = () => {
    confirmReceipt({ id: '62c30d2ac65cae98b1d7c6c0', isReq: Number(isReq) })
      .then((resp) => {
        if (resp.data.status === 200) {
          message.success('Confirmed');
          updateSteps(isReq, 6);
          setIsCompleted(true);
        } else {
          message.error('Something went wrong, please try again');
        }
      });
  };

  let text;
  if (editable) {
    if (isCompleted) {
      text = 'You have confirmed receipt of book(s)';
    } else {
      text = 'Confirm receipt of the book(s) you ordered';
    }
  } else if (isCompleted) {
    text = `${username} has confirmed receipt of your book(s)`;
  } else {
    text = `Waiting for ${username}'s confirmation`;
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '-10px' }}>
      {
        isCompleted
        && <div style={{ marginTop: '30px', fontWeight: 500 }}>{text}</div>
      }
      {
        !isCompleted
        && (
        <Button
          type="primary"
          style={{ height: 'fit-content', whiteSpace: 'normal', padding: '10px 20px' }}
          className={disabled ? 'disabled-btn' : ''}
          disabled={disabled}
          onClick={onConfirm}
        >
          <p style={{ fontWeight: 600, marginBottom: 0, lineHeight: '16px' }}>{text}</p>
        </Button>
        )
      }
    </div>

  );
}

function Books(props) {
  const { books, isReq, name } = props;
  return (
    <div className="rounded-container" style={{ paddingTop: '3px' }}>
      <span className="comment">
        {isReq ? 'You want' : `${name} wants`}
        :
      </span>
      <br />
      <Space>
        {
          books.map((book, index) => (
            <img key={index} src={book.cover} alt="cover" style={{ height: '100px', width: '70px', objectFit: 'cover' }} />
          ))
        }
      </Space>

    </div>
  );
}

function Payment(props) {
  const {
    fee, disabled, completed, editable, isReq, updateSteps,
  } = props;
  const [isCompleted, setIsComplete] = useState(completed);
  const [updatePayment] = useUpdatePaymentMutation();

  const onApprove = (data, actions) => {
    const payment = {
      orderId: data.orderID,
      payerId: data.payerID,
      amount: String(fee + 5),
    };
    actions.order.capture().then(() => updatePayment({ id: '62c30d2ac65cae98b1d7c6c0', isReq: Number(isReq), payment }))
      .then((resp) => {
        if (resp.data.status === 200) {
          message.success('Payment completed');
          updateSteps(isReq, 4);
          setIsComplete(true);
        } else {
          message.error('Something went wrong, please contact us');
        }
      });
  };
  const onError = (data, actions) => {
    message.error('Something went wrong, please try again');
    return actions.order.capture();
  };
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
              {fee.toFixed(2)}
              {' '}
              €
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
                    editable
                    && (
                      <PayPalBtn
                        amount={fee + 5}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    )
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
              {(fee + 5).toFixed(2)}
              {' '}
              €
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
  const {
    disabled, code, editable, isReq, updateSteps,
  } = props;
  const [newCode, setNewCode] = useState(code);
  const [displayCode, setDisplayCode] = useState(newCode);
  const [loading, setLoading] = useState(false);
  const [updateTracking] = useUpdateTrackingMutation();
  const onConfirm = () => {
    setLoading(true);
    updateTracking({ id: '62c30d2ac65cae98b1d7c6c0', isReq: Number(isReq), trackingCode: newCode })
      .then((resp) => {
        if (resp.data.status === 200) {
          message.success('Tracking code updated');
          setDisplayCode(newCode);
          updateSteps(isReq, 5);
          setLoading(false);
        } else {
          message.error('Something went wrong, please try again');
          setLoading(false);
        }
      });
  };
  const onChange = (e) => {
    setNewCode(e);
  };

  return (
    <div className={`rounded-container${disabled ? ' disabled' : ''}`}>
      <div style={{ margin: '8px 0px' }}>
        <h4>Tracking Code</h4>
        {(!displayCode && editable)
          && (
            <div className="vertical-center">
              <Input style={{ flex: '1 1 auto', height: '35px' }} onChange={(e) => onChange(e.target.value)} />
              <Button type="primary" className="btn-inline" onClick={onConfirm} disabled={loading}>Confirm</Button>
            </div>
          )}
        {
          (!displayCode && !editable)
          && 'Tracking code not uploaded yet'
        }
        {
          displayCode
          && <span>{displayCode}</span>
        }
      </div>
    </div>
  );
}