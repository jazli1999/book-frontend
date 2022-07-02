import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { message } from 'antd';

import config from '../config';

function PayPalBtn(props) {
  const { amount } = props;
  const createOrder = (_, actions) => actions.order.create({
    purchase_units: [{
      amount: {
        value: amount,
        currency_code: 'EUR',
      },
    }],
  });

  const onApprove = (data, actions) => {
    message.success('Payment completed');
    const { orderID, payerID } = data;
    // TODO send to backend, remove log
    console.log(orderID, payerID);
    return actions.order.capture();
  };

  const onError = (data, actions) => {
    message.error('Something went wrong, please try again');
    return actions.order.capture();
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': config.PAYPAL_CLIENT_ID, currency: 'EUR' }}>
      <div style={{ width: 10 }}>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onError={(data, actions) => onError(data, actions)}
          style={{ layout: 'horizontal', height: 25, color: 'gold' }}
        />
      </div>

    </PayPalScriptProvider>
  );
}

export default PayPalBtn;
