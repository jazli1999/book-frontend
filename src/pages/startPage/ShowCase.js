import { Row, Col, Space } from 'antd';
import Tick from '../../assets/images/tick.svg';
import ShotA from '../../assets/images/shot_a.png';
import ShotB from '../../assets/images/shot_b.png';

import './index.less';

const ShowCase = () => {
  return (
    <div id='ad'>
      <div>
        <Row>
          <Space direction='vertical'>
            <div>
              
              <div>Get your next book to read for FREE</div>
              <div>and connect to people sharing love for books</div>
              <div>with book exchanges that are ...</div>
            </div>
            <div>
              <TickItem text='cost-efficient' />
              <TickItem text='eco-friendly' />
              <TickItem text='less-riskly' />
            </div>
            <div>
              ... here at BookEx.
            </div>
          </Space>
        </Row>
        <Row>
          <Col span={12}>
            <img className='screenshot' alt='order' src={ShotA} />
          </Col>
          <Col span={12}>
            <img className='screenshot' alt='bookmate' src={ShotB} />
            <Row>
              <div style={{ marginTop: '12px', fontWeight: 600 }}>
                <div>New Readings</div>
                <div>New Friends</div>
                <div>Greener Lifestyle</div>
              </div>
              <div style={{ fontWeight: 100, fontSize: '46pt', marginLeft: '10px'}}>
                :)
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const TickItem = (props) => {
  return (
    <div>
      <Space size='middle'>
        <img src={Tick} alt='tick' style={{ width: '20px' }} />
        <div style={{ whiteSpace: 'nowrap' }}>{props.text}</div>
      </Space>
    </div>
  );
}

export default ShowCase;