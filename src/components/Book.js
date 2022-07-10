import {
  Col, Row, Space,
} from 'antd';
import CheckedBox from '../assets/images/checked-box.svg';

function Book(props) {
  return (
    <div className="shelf-book-item">
      <Row style={{ flexFlow: 'nowrap' }}>
        <Col>
          <img src={props.image} alt="cover" style={{ height: '110px', width: '70px', objectFit: 'cover' }} />
        </Col>
        <Col style={{ padding: '0px 8px', width: '122px' }}>
          <p className="shelf-book-title">{props.title}</p>
          <p className="shelf-book-author">{props.author}</p>
          {props.exchangeable
            && (
            <div style={{ position: 'absolute', bottom: 2 }}>
              <Space size={4}>
                <img src={CheckedBox} alt="exchangeable" style={{ width: '13px' }} />
                <span style={{ color: '#658e49', fontSize: '8pt', fontWeight: 600 }}>Exchangeable</span>
              </Space>
            </div>
            )}
        </Col>
      </Row>
    </div>
  );
}
export default Book;
