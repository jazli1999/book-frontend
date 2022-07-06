import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import config from '../config';

function PayPalBtn(props) {
  const { amount, onApprove, onError } = props;
  const createOrder = (_, actions) => actions.order.create({
    purchase_units: [{
      amount: {
        value: amount,
        currency_code: 'EUR',
      },
    }],
  });

  return (
    <PayPalScriptProvider options={{ 'client-id': config.PAYPAL_CLIENT_ID, currency: 'EUR' }}>
      <div style={{ marginBottom: '-5px', marginLeft: '8px' }}>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
          onError={(data, actions) => onError(data, actions)}
          style={{ layout: 'horizontal', height: 25, color: 'white' }}
        />
      </div>

    </PayPalScriptProvider>
  );
}

export default PayPalBtn;
