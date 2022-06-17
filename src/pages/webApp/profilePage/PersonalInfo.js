import React from 'react';
import {
  Button, Form, Input, Select, DatePicker,
  Col, Row,
} from 'antd';

import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const { Option } = Select;

export default function PersonalInfo() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of profile form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+49</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div>
      <h3 className="center"><b>Basic Information</b></h3>
      <div id="profileInformation">
        <Form
          form={form}
          name="personalInfo"
          onFinish={onFinish}
          initialValues={{
            // we can add pre-filled data automatically
            prefix: '86',
          }}
          layout="vertical"
          scrollToFirstError
        >
          <Row align="top" justify="space-around">
            <Col span={10}>
              <Form.Item name="firstname" label="First Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} />

            <Col span={10}>
              <Form.Item name="lastname" label="Last Name">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" align="top">
            <Col span={10}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row align="top" justify="space-around">
            <Col span={10}>
              <Form.Item name="country" label="Country">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} />

            <Col span={10}>
              <Form.Item name="state" label="State">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row align="top" justify="space-around">
            <Col span={10}>
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} />

            <Col span={10}>
              <Form.Item name="postCode" label="Post code">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center" align="top">
            <Col span={10}>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select gender!',
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} />
            <Col span={10}>
              <Form.Item name="birthday" label="Birthday">
                <DatePicker
                  defaultValue={moment('2015/01/01', dateFormat)}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>

          </Form.Item>
          <Form.Item>
            <div className="form-action-container" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
