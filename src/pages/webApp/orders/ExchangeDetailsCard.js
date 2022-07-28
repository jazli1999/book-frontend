import {
  Col, Row, Space, Divider, Input, Button, message, Empty, Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CloseOutlined } from '@ant-design/icons';
import WhiteTick from '../../../assets/images/white_tick.svg';
import { PayPalBtn } from '../../../components';
import {
  useUpdatePaymentMutation,
  useUpdateTrackingMutation,
  useConfirmReceiptMutation,
  usePickBooksMutation,
  useDeclineOrderMutation,
} from '../../../slices/order.api.slice';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';
import { useGetSubscriptionInfoQuery } from '../../../slices/subscription.api.slice';
import PickBookModal from './PickBookModal';

export default function ExchangeDetailsCard(props) {
  const {
    user: order,
    current: editable,
    request,
    status,
    updateSteps,
    bookmateId,
    create,
    createOrder,
    orderStatus,
  } = props;

  const { data, isSuccess } = useGetUserInfoQuery(props.user.userId);
  const { data: subsData, isSuccess: subsSuccess} = useGetSubscriptionInfoQuery();
  const [transaction, setTransaction] = useState(1);
  const [premium, setPremium] = useState(false);
  let username;
  if (isSuccess) {
    username = `${data.firstName} ${data.lastName}`;
  }
  useEffect(()=> {
    if( subsSuccess ){
      setPremium(subsData.isPremium);
      if(subsData.isPremium){
        setTransaction(0);
      }
    }    
  },[subsSuccess])
  // if(subsSuccess && props.current){
  //   console.log(subsData);
    
  // }
  const fee = order.wishList.length * 0.5 * transaction;
  const paid = Object.prototype.hasOwnProperty.call(order.payment, 'orderId');
  const chosenBooks = order.wishList;
  return (
    <div style={{ padding: '0px 30px 0px 10px' }}>
      <Books
        books={chosenBooks}
        isCurrent={editable}
        editable={editable && ((status === 1 && request) || (status === 2 && !request))}
        isReq={request}
        name={username}
        bookmateId={bookmateId}
        updateSteps={updateSteps}
        createOrder={createOrder}
        create={create}
        orderStatus={orderStatus}
      />
      <Payment
        fee={fee}
        disabled={status < 3}
        completed={paid}
        editable={editable && status === 3}
        updateSteps={updateSteps}
        isReq={request}
        premium = {premium}
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
        isCurrent={editable}
        editable={editable}
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
  const { id } = useParams();

  /*
   * disabled: hasn't reached this step
   * editable: whether the current logged in user corresponds to the current card
   * isReq: flag sent to backend to note which user's detail to update
   */

  const [confirmReceipt] = useConfirmReceiptMutation();

  const onConfirm = () => {
    confirmReceipt({ id, isReq: Number(isReq) })
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
  const {
    isCurrent,
    books,
    editable,
    name,
    bookmateId,
    isReq,
    updateSteps,
    create,
    createOrder,
    orderStatus,
  } = props;
  const [edit, setEdit] = useState(false);
  const [renderBooks, setRenderBooks] = useState(books);
  const [syncBooks, setSyncBooks] = useState(renderBooks);
  const [confirmed, setConfirmed] = useState(!editable);
  const [declined, setDeclined] = useState(orderStatus === 'Declined');
  const [pickBooks] = usePickBooksMutation();
  const [cancelOrders] = useDeclineOrderMutation();
  const { id } = useParams();

  const sendBooks = () => {
    if (renderBooks.length === 0) {
      message.error('You haven\'t picked any books');
      return;
    }
    pickBooks({
      id,
      isReq: Number(isReq),
      bookList: renderBooks.map((book) => book.id),
    }).then((resp) => {
      if (resp.data.status === 200) {
        message.success('Book list confirmed');
        if (isReq) {
          updateSteps(isReq, 2);
        } else {
          updateSteps(!isReq, 3);
        }
        setConfirmed(true);
      } else {
        message.error('Something went wrong, please try again');
      }
    });
  };

  const sendOrder = () => {
    if (renderBooks.length === 0) {
      message.error('You haven\'t picked any books');
      return;
    }
    createOrder(renderBooks.map((book) => book.id));
  };

  const declineOrder = () => {
    cancelOrders({
      id,
    }).then((resp) => {
      if (resp.data.status === 200) {
        message.success('Order Declined');
        setDeclined(true);
      } else {
        message.error('Something went wrong, please try again');
      }
    });
  };

  return (
    <div>
      <div className="vertical-center" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: '5px', fontSize: '13pt' }}>{create ? 'You' : name}</h2>
        {
          declined && (
            <span>
              Order is declined.
            </span>
          )
        }
        {(!confirmed && !declined)
          && (
            <span>
              <Button
                className="match-btn"
                type="primary"
                size="small"
                onClick={() => { setEdit(true); }}
                ghost
              >
                {' '}
                <span style={{ fontWeight: 600 }}>Pick Books</span>
              </Button>
              <Button
                className="match-btn"
                type="primary"
                size="small"
                style={{ marginLeft: '5px' }}
                onClick={create ? sendOrder : sendBooks}
              >
                {' '}
                <span style={{ fontWeight: 600 }}>Confirm</span>
              </Button>
              {
                !create && (
                  <Button
                    className="match-btn"
                    type="danger"
                    size="small"
                    style={{ marginLeft: '5px' }}
                    onClick={declineOrder}
                  >
                    {' '}
                    <span style={{ fontWeight: 600 }}>Decline</span>
                  </Button>
                )
              }
            </span>

          )}

      </div>
      <Modal
        visible={edit}
        width={960}
        style={{ minWidth: 960 }}
        title="Pick the book(s) you want"
        closeIcon={<CloseOutlined style={{ textAlign: 'right', position: 'absolute', right: 22 }} />}
        onCancel={() => { setEdit(false); }}
        onOk={() => {
          setRenderBooks(syncBooks);
          setEdit(false);
        }}
      >
        <PickBookModal bookmateId={bookmateId} updateList={setSyncBooks} />
      </Modal>
      <div className="rounded-container" style={{ paddingTop: '3px' }}>
        <span className="comment">
          {isCurrent ? 'You want' : `${name} wants`}
          :
        </span>
        <br />
        {
          (renderBooks.length > 0)
          && (
            <Space>
              {
                renderBooks.map((book, index) => (
                  <img key={index} src={book.image} alt={book.title} style={{ height: '100px', width: '70px', objectFit: 'cover' }} />
                ))
              }
            </Space>
          )
        }
        {
          (renderBooks.length === 0)
          && <Empty description="" style={{ height: '100px' }} />
        }

      </div>
    </div>

  );
}

function Payment(props) {
  const {
    fee, disabled, completed, editable, isReq, updateSteps, premium,
  } = props;
  const [isCompleted, setIsComplete] = useState(completed);
  const [updatePayment] = useUpdatePaymentMutation();
  const { id } = useParams();

  const onApprove = (data, actions) => {
    const payment = {
      orderId: data.orderID,
      payerId: data.payerID,
      amount: String(fee + 5),
    };
    actions.order.capture().then(() => updatePayment({ id, isReq: Number(isReq), payment }))
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
          {!premium && (
            <Col span={19}>
              <h4 style={{ margin: '2px 0px 3px 0px' }}>Transaction Fee</h4>
              <p className="comment">
                We take 0.5 € per book you exchange Premium members can exchange for free!
              </p>
            </Col>
          )}
          {premium && (
            <Col span={19}>
              <h4 style={{ margin: '2px 0px 3px 0px' }}>Transaction Fee</h4>
              <p className="comment">
                Enjoy your free exchange with premium subscription.
              </p>
            </Col>
          )}         
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
  const { id } = useParams();
  const [newCode, setNewCode] = useState(code);
  const [displayCode, setDisplayCode] = useState(newCode);
  const [loading, setLoading] = useState(false);
  const [updateTracking] = useUpdateTrackingMutation();
  const onConfirm = () => {
    setLoading(true);
    updateTracking({ id, isReq: Number(isReq), trackingCode: newCode })
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
