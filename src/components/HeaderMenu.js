import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, message, Space } from 'antd';
import {
  ProfileOutlined, LogoutOutlined, TeamOutlined, UserAddOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

import SearchButton from './SearchButton';
import Logo from './Logo';
import utils from '../utils';

import './index.less';

export default function HeaderMenu() {
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();
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
      key: 'bookmates',
      label: 'Bookmates',
      children: [
        {
          key: 'settings',
          label: 'My Bookmates',
          icon: <TeamOutlined />,
          onClick: () => navigate('/app/bookmates/list'),
        },
        { type: 'divider' },
        {
          key: 'explore',
          label: 'Explore',
          icon: <UserAddOutlined />,
          onClick: () => navigate('/app/main'),
        },
      ],

    },
    { key: 'messages', label: 'Messages' },
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
