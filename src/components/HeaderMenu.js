import React from "react";
import Logo from "./Logo";
import SearchButton from "./SearchButton";
import { useNavigate } from 'react-router-dom';
import { Menu, Space } from "antd";
import { ProfileOutlined, LogoutOutlined } from "@ant-design/icons";

import './index.less';

export default function HeaderMenu() {

  const navigate = useNavigate();

  const menuStyle = {
    height: '63px',
    borderBottom: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  };

  const userName = 'Emma';

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
      label: <span style={greetingStyle}>Hi, <span>{userName}</span></span>,
    },
    {
      key: 'home',
      onClick: () => navigate("/app"),
      label: 'Bookmates'
    },
    { key: 'messages', label: 'Messages' },
    { key: 'orders', label: 'Orders' },
    {
      key: 'profileSubmenu',
      label: 'My Profile',
      children: [
        {
          key: 'settings',
          label: 'Profile Settings',
          icon: <ProfileOutlined />,
          onClick: ()=> navigate("/app/profile"),
        },
        { type: 'divider' },
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />,
        }
      ],
    },
  ]

  return (
      <Menu style={menuStyle} 
            mode="horizontal" 
            defaultSelectedKeys={["home"]} 
            items={items} />
  );
}
