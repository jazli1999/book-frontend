import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, message, Space } from 'antd';
import {
  ProfileOutlined, LogoutOutlined,
} from '@ant-design/icons';
import { useGetUserInfoQuery } from '../slices/user.api.slice';

import SearchButton from './SearchButton';
import Logo from './Logo';
import utils from '../utils';

import './index.less';

export default function HeaderMenu() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetUserInfoQuery();
  let username;
  if (isSuccess) {
    username = data.firstName;
  }

  const menuStyle = {
    height: '63px',
    borderBottom: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  };

  const logout = () => {
    utils.clearJWT();
    message.success('Successfuly logged out');
    navigate('/welcome');
  };

  const greetingStyle = {
    width: '100%',
    marginRight: '20px',
    textAlign: 'right',
  };

  const items = [
    {
      key: 'logo',
      id: 'logo-search',
      label: (
        <Space size={60}>
          <Logo />
          <SearchButton />
        </Space>
      ),
      style: { marginLeft: '0px', marginRight: 'auto' },
      disabled: true,
    },
    {
      id: 'greeting',
      key: 'greeting',
      disabled: true,
      label: (
        <span style={greetingStyle}>
          Hi,
          {' '}
          <span>{username}</span>
        </span>
      ),
    },
    {
      key: 'explore',
      label: 'Explore',
      onClick: () => navigate('/app'),
    },
    { key: 'bookmates', label: 'Bookmates', onClick: () => navigate('/app/bookmates') },
    { key: 'orders', onClick: () => navigate('/app/orders'), label: 'Orders' },
    {
      key: 'profileSubmenu',
      label: 'My Profile',
      children: [
        {
          key: 'settings',
          label: 'Profile Settings',
          icon: <ProfileOutlined />,
          onClick: () => navigate('/app/profile'),
        },
        { type: 'divider' },
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />,
          onClick: logout,
        },
      ],
    },
  ];

  return (
    <Menu
      style={menuStyle}
      mode="horizontal"
      defaultSelectedKeys={['home']}
      items={items}
    />
  );
}
