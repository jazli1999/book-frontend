import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Input, Checkbox, Button, Space, message,
} from 'antd';
import { Logo } from '../../components';
import authRepository from '../../repositories/auth.repository';
import Exchange from '../../assets/images/exchange.png';
import utils from '../../utils';

import './index.less';

function LoginPanel() {
  const [loading, setLoading] = useState(false);
  const { setJWT } = utils;
  const navigate = useNavigate();
  const onFinish = (values) => {
    setLoading(true);
    authRepository.login(values.email, values.password).then((res) => {
      setJWT(res.data.token);
      message.success(`Welcome back`);
      navigate('/app');
    }).catch((err) => {
      if (err.response.status === 401) {
        message.error('Wrong credentials, please try again');
      } else {
        message.error('Something went wrong');
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div id="loginPanel">
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Logo />
      </div>
      <div className="header-0" style={{ marginTop: '20px' }}>Login</div>
      <div className="description">
        Sign in with your data that you entered during your registration.
      </div>
      <div style={{ margin: '20px 0px' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label={<span className="input-label">Email</span>}>
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item name="password" label={<span className="input-label">Password</span>}>
            <Input placeholder="min. 8 characters" type="password" />
          </Form.Item>
          <Form.Item name="keep" valuePropName="checked">
            <Checkbox style={{ marginTop: '-10px' }}>
              <span style={{ fontSize: '10pt' }}>
                Keep me logged in
              </span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <div className="form-action-container">
              <div>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Log in
                  </Button>
                <div className="link">
                  <a href="/">Forgot Password</a>
                </div>
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  <Space>
                    <span>Don't have an account?</span>
                    <a className="link" href="/register">Sign up</a>
                  </Space>
                </div>
              </div>
            </div>
          </Form.Item>
        </Form>
        <img src={Exchange} alt="exchange pic" style={{ width: '110%', margin: '30px 0px 0px -15px' }} />
      </div>
    </div>
  );
}

export default LoginPanel;
