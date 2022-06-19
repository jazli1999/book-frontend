import React, { useState } from 'react';
import {
  Button, Form, Input, Select, DatePicker,
  Col, Row,
} from 'antd';

import moment from 'moment';

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

  const userInfo = {
    firstname: 'Emma',
    lastname: 'Johnson',
    gender: 'female',
    birthday: '1998/06/07',
    country: 'Germany',
    state: 'Bayern',
    city: 'Munich',
    postcode: '80333',
    street: 'Arcisstrasse',
    no: '21',
    bio: 'I love history and philosophy books. 📕 Both onsite or mail exhcange are ok.',
  };

  return (
    <div style={{ marginTop: '10px', marginBottom: '5px' }}>
      <div className="vertical-center" style={{ marginBottom: '15px' }}>
        <h2 style={{ display: 'inline', marginBottom: '0px' }}>
          Basic Information
        </h2>
        {!edit
          && (
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
          initialValues={{
            // we can add pre-filled data automatically
            prefix: '86',
          }}
          layout="vertical"
          scrollToFirstError
        >
          <Row align="top" justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item name="firstname" label="First Name">
                <Input disabled={!edit} defaultValue={userInfo.firstname} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastname" label="Last Name">
                <Input disabled={!edit} defaultValue={userInfo.lastname} />
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
                <Input disabled={!edit} defaultValue={userInfo.country} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state" label="State">
                <Input disabled={!edit} defaultValue={userInfo.state} />
              </Form.Item>
            </Col>
          </Row>

          <Row align="top" justify="space-between" gutter={16}>
            <Col span={12}>
              <Form.Item name="city" label="City">
                <Input disabled={!edit} defaultValue={userInfo.city} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="postCode" label="Post code">
                <Input disabled={!edit} defaultValue={userInfo.postcode} />
              </Form.Item>
            </Col>
          </Row>

          <Row align="top" justify="space-between" gutter={16}>
            <Col span={18}>
              <Form.Item name="street" label="Street">
                <Input disabled={!edit} defaultValue={userInfo.street} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="House No." label="No.">
                <Input disabled={!edit} defaultValue={userInfo.no} />
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
  );
}
