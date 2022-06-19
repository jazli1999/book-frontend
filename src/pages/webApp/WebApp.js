import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderMenu } from '../../components';

import './index.less';

function WebApp() {
  const { Content, Header } = Layout;

  return (
    <div id="WebApp">
      <Layout>
        <Header>
          <HeaderMenu />
        </Header>
        <Content className="app-body">
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default WebApp;
