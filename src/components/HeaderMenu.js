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

  return (
    <div>
      <Menu style={menuStyle} mode="horizontal" defaultSelectedKeys={["home"]}>
        
        <Menu.Item id='logo-search' style={{ marginLeft: '0px', marginRight: 'auto' }} disabled>
          <Space size={60}>
            <Logo />
            <SearchButton />
          </Space>
        </Menu.Item>

        <Menu.Item id='greeting' disabled>
          <span style={greetingStyle}>Hi, <span>{userName}</span></span>
        </Menu.Item>

        <Menu.Item key="home" onClick={() => navigate("/app")}>Main Page</Menu.Item>
        <Menu.Item key="messages">Messages</Menu.Item>
        <Menu.Item key="orders" >Orders</Menu.Item>
        <Menu.SubMenu key="profileSubmenu" title="My Profile">
          <Menu.Item key="two" icon={<ProfileOutlined />} onClick={() => navigate("/app/profile")} >
            Profile Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="three" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>

      </Menu>
    </div>
  );
}
