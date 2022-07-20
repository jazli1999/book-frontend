import {
  Col, Row, Space, Checkbox,
} from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

function Book(props) {
  const [checked, setChecked] = useState(props.exchangeable);

  useEffect(() => {
    console.log(props.title, props.exchangeable, checked);
    if (props.changeEx) props.changeEx(props.index, checked);
    console.log(props.title, props.exchangeable, checked);
  }, [checked]);

  return (
    <div className="shelf-book-item">
      <Row style={{ flexFlow: 'nowrap' }}>
        <Col>
          <img src={props.image} alt="cover" style={{ height: '110px', width: '70px', objectFit: 'cover' }} />
        </Col>
        <Col style={{ padding: '0px 8px' }}>
          <p className="shelf-book-title">{props.title}</p>
          <p className="shelf-book-author">{props.author}</p>
          {
            (props.showEx && (props.editable || props.exchangeable)) && (
              <div
                style={{
                  position: 'absolute', bottom: 2, marginLeft: '-3px', paddingTop: '5px',
                }}
                role="button"
                onClick={(e) => {
                  console.log(`click ${props.title}`);
                  if (props.editable) {
                    e.stopPropagation();
                    setChecked(!checked);
                  }
                }}
              >
                <Space size={2}>
                  <Checkbox
                    style={{ width: '13px' }}
                    disabled={!props.editable}
                    checked={checked}
                  />
                  <span style={{ color: checked ? '#658e49' : '#4f524e', fontSize: '8pt', fontWeight: 600 }}>Exchangeable</span>
                </Space>
              </div>
            )
          }
        </Col>
      </Row>
    </div>
  );
}
export default Book;
