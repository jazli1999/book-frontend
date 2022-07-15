import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Input, Button, message, Checkbox,
} from 'antd';
import { useDispatch } from 'react-redux';

import { Logo } from '../../components';
import authRepository from '../../repositories/auth.repository';
import Exchange from '../../assets/images/exchange.png';
import utils from '../../utils';

import './index.less';
import { setName } from '../../slices/user.slice';

function LoginPanel() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { setJWT } = utils;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoading(true);
    const { email, password } = values;
    if (isLogin) {
      authRepository.login(email, password).then((res) => {
        setJWT(res.data.token);
        dispatch(setName(res.data.username));
        message.success('Welcome back');
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
    } else {
      authRepository.register(email, password).then((res) => {
        setJWT(res.data.token);
        message.success('Welcome!');
        navigate('/app');
      }).catch((err) => {
        if (err.response.status === 400) {
          message.error('Email already exists');
        } else {
          message.error('Something went wrong');
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const registerHintLine = (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <span>Don't have an account?</span>
      <Button className="link" type="link" size="small" onClick={() => { setIsLogin(false); }}>
        Register
      </Button>
    </div>
  );

  const loginHintLine = (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <span>Already have an account?</span>
      <Button className="link" type="link" size="small" onClick={() => { setIsLogin(true); }}>
        Login
      </Button>
    </div>
  );

  return (
    <div id="loginPanel">
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Logo />
      </div>
      <div className="header-0" style={{ marginTop: '20px' }}>
        {isLogin ? 'Login' : 'Register'}
      </div>
      <div className="description">
        {isLogin
          ? 'Sign in with your data that you entered during your registration.'
          : `Register with your email and setup your password, only one account
              is allowed for each email.`}
      </div>
      <div style={{ margin: '20px 0px' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={(
              <span
                className="input-label"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail',
                  }]}
              >
                Email
              </span>
            )}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item name="password" label={<span className="input-label">Password</span>}>
            <Input placeholder="min. 8 characters" type="password" />
          </Form.Item>
          {!isLogin
            && (
            <Form.Item name="keep" valuePropName="checked">
              <Checkbox style={{ marginTop: '-10px' }}>
                {/* useless so far */}
                <span style={{ fontSize: '10pt' }}>
                  Agree the user agreement
                </span>
              </Checkbox>
            </Form.Item>
            )}
          <Form.Item>
            <div className="form-action-container">
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" loading={loading} style={{ width: '200px' }}>
                  {isLogin ? 'Log in' : 'Register'}
                </Button>
                {isLogin
                  && (
                    <div className="link">
                      <Button type="link" size="small">Forget Password</Button>
                    </div>
                  )}
                {isLogin ? registerHintLine : loginHintLine}
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
