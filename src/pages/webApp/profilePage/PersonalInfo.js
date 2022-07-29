import React, { useState } from 'react';
import {
  Button, Form, Input, Select, DatePicker, Modal,
  Col, Row, Typography, message,
} from 'antd';

import moment from 'moment';

import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from '../../../slices/user.api.slice';
import '../index.less';
import { SubscriptionPage } from '../subscriptionPage';

const { Text } = Typography;

export default function PersonalInfo() {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  const { Option } = Select;
  const { TextArea } = Input;
  const [edit, setEdit] = useState(false);
  const [showSubs, setShowSubs] = useState(false);

  const [updateInfo] = useUpdateUserInfoMutation();
  const parseDate = (date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  moment().utcOffset(2);
  const onFinish = (values) => {
    const newInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      birthday: values.birthday.format('YYYY/MM/DD'),
      bio: values.bio,
      address: {
        country: values.country,
        state: values.state,
        city: values.city,
        postcode: values.postcode,
        street: values.street,
        houseNumber: values.houseNumber,
      },
    };
    updateInfo(newInfo).then(() => {
      setEdit(false);
      window.location.reload();
    }).catch(() => {
      message.error('Something went wrong');
    });
  };

  const onFinishFailed = () => {
    message.error('Please fill all mandatory fields');
  };

  const onCancel = () => {
    form.resetFields();
    setEdit(false);
  };

  const onSubscription = () => {
    setShowSubs(true);
  };

  const editBtnStyle = {
    borderWidth: '1.4px',
    fontSize: '8pt',
    fontWeight: 600,
    height: '22px',
    padding: '0px 15px',
  };

  const { data: userInfo, isSuccess } = useGetUserInfoQuery();

  let birthday;
  let hasBirthday;
  let subscription;
  let endDate;
  let hasSubscription;
  let isFree;
  if (isSuccess) {
    hasBirthday = Object.prototype.hasOwnProperty.call(userInfo, 'birthday');
    const today = parseDate(new Date());
    birthday = userInfo.birthday || today;
    hasSubscription = Object.prototype.hasOwnProperty.call(userInfo, 'premium');
    if (hasSubscription) {
      subscription = userInfo.premium.isPremium ? 'Premium' : 'Free';
      isFree = !userInfo.premium.isPremium;
      endDate = moment(userInfo.premium.endDate).format('YYYY-MM-DD');
    } else {
      subscription = 'Free';
      endDate = '';
      isFree = true;
    }
  }

  return (
    <div style={{ marginTop: '10px', marginBottom: '5px' }}>
      {isSuccess
        && (
          <div>
            <Modal
              visible={showSubs}
              onCancel={() => setShowSubs(false)}
              width={800}
              footer={false}
              closeIcon={<span style={{ color: 'white', fontSize: '14pt' }}>x</span>}
              bodyStyle={{ height: '460px' }}
            >
              <SubscriptionPage />
            </Modal>
            <div className="vertical-center" style={{ marginBottom: '15px' }}>
              <h2 style={{ display: 'inline', marginBottom: '0px' }}>
                Basic Information
              </h2>
              {!edit && (
                <Button
                  className="match-btn"
                  style={editBtnStyle}
                  type="primary"
                  size="small"
                  onClick={() => { setEdit(true); }}
                  ghost
                >
                  <span style={{ fontWeight: 700 }}>Edit</span>
                </Button>
              )}
            </div>
            {
              !userInfo.firstName && (
                <span style={{ color: 'red', position: 'relative', top: '-10px' }}>Required fields need to be filled before access other pages</span>
              )
            }
            <div id="profileInformation">
              <Form
                form={form}
                style={{ marginTop: '-12px' }}
                name="personalInfo"
                onFinish={(values) => onFinish(values)}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                scrollToFirstError
                initialValues={{
                  ...userInfo,
                  ...userInfo.address,
                  birthday: moment(birthday, dateFormat),
                  subscription,
                }}
              >
                <Row align="top" justify="space-between" gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{
                        required: true,
                        message: 'First name is required',
                      }]}
                    >
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{
                        required: true,
                        message: 'Last name is required',
                      }]}
                    >
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-between" align="top" gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="Gender"
                      rules={[
                        {
                          required: true,
                          message: 'Please select gender',
                        },
                      ]}
                    >
                      <Select placeholder="select your gender" disabled={!edit || Object.prototype.hasOwnProperty.call(userInfo, 'gender')}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Non-binary</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="birthday"
                      label="Birthday"
                      rules={[{
                        required: true,
                        message: 'Please select birthday',
                      }]}
                    >
                      <DatePicker
                        disabled={!edit || hasBirthday}
                        format={dateFormat}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row align="top" justify="space-between" gutter={16}>
                  <Col span={12}>
                    <Form.Item name="country" label="Country">
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="state" label="State">
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row align="top" justify="space-between" gutter={16}>
                  <Col span={12}>
                    <Form.Item name="city" label="City">
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="postcode" label="Post code">
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row align="top" justify="space-between" gutter={16}>
                  <Col span={18}>
                    <Form.Item name="street" label="Street">
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="houseNumber" label="No.">
                      <Input disabled={!edit} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row align="top" justify="space-between" gutter={16}>
                  <Col span={12}>
                    <Form.Item name="subscription" label="Membership">
                      <Text level={3}>
                        {' '}
                        {subscription}
                      </Text>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginTop: '40px' }}>
                      <Button
                        className="match-btn"
                        type="primary"
                        size="small"
                        onClick={onSubscription}
                        ghost
                      >
                        <span style={{ fontWeight: 700 }}>Manage Subscription</span>
                      </Button>
                    </div>
                  </Col>
                </Row>

                {!isFree && (
                  <Row align="top" justify="space-between">
                    <Text level={3}>
                      Expires at
                      {' '}
                      {endDate}
                    </Text>
                  </Row>
                )}

                <Row align="top" justify="space-between" gutter={16}>
                  <Col span={24}>
                    <Form.Item name="bio" label="Bio">
                      <TextArea disabled={!edit} />
                    </Form.Item>
                  </Col>
                </Row>

                {edit
                  && (
                    <Form.Item style={{ textAlign: 'center' }}>
                      <div style={{ marginTop: '10px' }}>
                        <Button
                          className="match-btn"
                          type="primary"
                          onClick={onCancel}
                          style={{ width: '80px', marginLeft: '0px' }}
                          ghost
                        >
                          Cancel
                        </Button>
                        <Button
                          className="match-btn"
                          style={{ width: '80px' }}
                          type="primary"
                          htmlType="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                <Form.Item>
                  <div className="form-action-container" />
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
    </div>
  );
}
