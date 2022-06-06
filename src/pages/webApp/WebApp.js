import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Logo } from '../../components';

import './index.less';

function WebApp() {

  const { Header, Content } = Layout;

  return (
    <div id='WebApp'>
      <Layout>
        <Header>
          <Logo />
        </Header>
        <Content className='app-body'>
          <Outlet />
        </Content>
      </Layout>
    </div>
  )
}

export default WebApp;