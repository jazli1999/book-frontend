import { Space } from 'antd';

import LogoIcon from '../assets/images/logo.png';

const Logo = () => {
  return (
    <Space style={{ fontSize: '17pt', fontWeight: 700 }}>
      <img src={LogoIcon} alt='logo icon' style={{ width: '34px' }} />
      <div>
        <span>Book</span>
        <span style={{ color: '#7ea465' }}>Ex</span>
      </div>
    </Space>
  )
}

export default Logo;