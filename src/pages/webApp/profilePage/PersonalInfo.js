import React, { useState } from 'react';
import {
  Button, Form, Input, Select, DatePicker,
  Col, Row,
} from 'antd';

import moment from 'moment';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

import '../index.less';

export default function PersonalInfo() {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  const { Option } = Select;
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log('Received values of profile form: ', values);
  };

  const [edit, setEdit] = useState(false);

  const editBtnStyle = {
    borderWidth: '1.4px',
    fontSize: '8pt',
    fontWeight: 600,
    height: '22px',
    padding: '0px 15px',
  };

  const { data: userInfo, isSuccess } = useGetUserInfoQuery();

  return (
    <div style={{ marginTop: '10px', marginBottom: '5px' }}>
      {isSuccess
        && (
        <div>
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
          <div id="profileInformation">
            <Form
              form={form}
              style={{ marginTop: '-12px' }}
              name="personalInfo"
              onFinish={onFinish}
              layout="vertical"
              scrollToFirstError
            >
              <Row align="top" justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item name="firstName" label="First Name">
                    <Input disabled={!edit} defaultValue={userInfo.firstName} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="lastName" label="Last Name">
                    <Input disabled={!edit} defaultValue={userInfo.lastName} />
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
                    <Select placeholder="select your gender" disabled defaultValue={userInfo.gender}>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="birthday" label="Birthday">
                    <DatePicker
                      disabled
                      defaultValue={moment(userInfo.birthday, dateFormat)}
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row align="top" justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item name="country" label="Country">
                    <Input disabled={!edit} defaultValue={userInfo.address.country} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="state" label="State">
                    <Input disabled={!edit} defaultValue={userInfo.address.state} />
                  </Form.Item>
                </Col>
              </Row>

              <Row align="top" justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item name="city" label="City">
                    <Input disabled={!edit} defaultValue={userInfo.address.city} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="postcode" label="Post code">
                    <Input disabled={!edit} defaultValue={userInfo.address.postcode} />
                  </Form.Item>
                </Col>
              </Row>

              <Row align="top" justify="space-between" gutter={16}>
                <Col span={18}>
                  <Form.Item name="street" label="Street">
                    <Input disabled={!edit} defaultValue={userInfo.address.street} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="houseNumber" label="No.">
                    <Input disabled={!edit} defaultValue={userInfo.address.houseNumber} />
                  </Form.Item>
                </Col>
              </Row>

              <Row align="top" justify="space-between" gutter={16}>
                <Col span={24}>
                  <Form.Item name="bio" label="Bio">
                    <TextArea disabled={!edit} defaultValue={userInfo.bio} />
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
                        onClick={() => { setEdit(false); }}
                        style={{ width: '80px', marginLeft: '0px' }}
                        ghost
                      >
                        Cancel
                      </Button>
                      <Button
                        className="match-btn"
                        style={{ width: '80px' }}
                        onClick={() => { setEdit(false); }}
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
