import React from "react";
import Logo from "./Logo";
import SearchButton from "./SearchButton";
import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";

export default function HeaderMenu() {
  return (
    <Header>
      <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Logo />
        <SearchButton />

        <Menu.Item key="greetings" style={{ marginLeft: "150px" }}>
          Hi, User!
        </Menu.Item>

        <Menu.Item key="home" icon={<HomeOutlined />}>
          Main Page
        </Menu.Item>

        <Menu.Item key="messages">Messages</Menu.Item>

        <Menu.Item key="orders">Orders</Menu.Item>

        <Menu.SubMenu
          key="profileSubmenu"
          title="My Profile"
          icon={<UserOutlined />}
        >
          <Menu.Item key="two" icon={<ProfileOutlined />} href="/profile">
            Profile Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="three" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
}
