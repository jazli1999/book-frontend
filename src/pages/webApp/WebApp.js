import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { HeaderMenu } from "../../components";

import "./index.less";

function WebApp() {
  const { Content } = Layout;

  return (
    <div id="WebApp">
      <Layout>
    <HeaderMenu></HeaderMenu>
        <Content className="app-body">
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default WebApp;
