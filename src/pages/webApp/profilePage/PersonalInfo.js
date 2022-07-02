import React, { useState } from 'react';
import {
  Button, Form, Input, Select, DatePicker,
  Col, Row, message,
} from 'antd';

import moment from 'moment';
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from '../../../slices/user.api.slice';

import '../index.less';

export default function PersonalInfo() {
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD';
  const { Option } = Select;
  const { TextArea } = Input;
  const [edit, setEdit] = useState(false);

  const [updateInfo] = useUpdateUserInfoMutation();

  const onFinish = (values) => {
    const newInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      birthday: values.birthday,
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
    }).catch(() => {
      message.error('Something went wrong');
    });
  };

  const onCancel = () => {
    form.resetFields();
    setEdit(false);
  };

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
              onFinish={(values) => onFinish(values)}
              onFinishFailed={(v, e, o) => { console.log(v, e, o); }}
              layout="vertical"
              scrollToFirstError
              initialValues={{
                ...userInfo,
                ...userInfo.address,
                birthday: moment(userInfo.birthday, dateFormat),
              }}
            >
              <Row align="top" justify="space-between" gutter={16}>
                <Col span={12}>
                  <Form.Item name="firstName" label="First Name">
                    <Input disabled={!edit} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="lastName" label="Last Name">
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
                    <Select placeholder="select your gender" disabled>
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
