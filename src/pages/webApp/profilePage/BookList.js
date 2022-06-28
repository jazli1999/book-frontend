import React from 'react';
import {
  Col, Row, List, Button, Space, Empty,
} from 'antd';
import CheckedBox from '../../../assets/images/checked-box.svg';

import '../index.less';

export default function BookList(props) {
  const editBtnStyle = {
    borderWidth: '1.4px',
    fontSize: '8pt',
    fontWeight: 600,
    height: '22px',
    padding: '0px 15px',
  };

  const emptyTextNode = (
    <div style={{ fontWeight: 400, color: '#8c96a0' }}>
      <div>
        You don't have books
        <br />
        in your
        {' '}
        {props.title.toLowerCase()}
        {' '}
        currently
      </div>
      <br />
      <div>
        Go add some
        <br />
        So people who have them
        <br />
        could reach out to you
      </div>
    </div>
  );

  const emptyHint = <Empty description={emptyTextNode} />;

  return (
    <div style={{ marginTop: '10px', marginBottom: '5px' }}>
      <div className="vertical-center" style={{ marginBottom: '15px' }}>
        <h2 style={{ display: 'inline', marginBottom: '0px' }}>
          {props.title}
        </h2>
        {props.isEditable && <Button className="match-btn" style={editBtnStyle} type="primary" size="small" ghost>
          <a href='/app/profile/collection/edit'><span style={{ fontWeight: 700 }}>Edit</span> </a>
          
        </Button> }
      </div>
      <div>
        <List
          itemLayout="vertical"
          grid={{ column: 2 }}
          size="default"
          pagination={{
            pageSize: 8,
            size: 'small',
            style: { width: 'fit-content', margin: 'auto' },
            hideOnSinglePage: true,
          }}
          locale={{ emptyText: emptyHint }}
          dataSource={props.bookList}
          renderItem={(item) => <Book {...item} />}
        />
      </div>
    </div>
  );
}

function Book(props) {
  return (
    <div className="shelf-book-item">
      <Row style={{ flexFlow: 'nowrap' }}>
        <Col>
          <img src={props.cover} alt="cover" style={{ height: '110px', width: '70px', objectFit: 'cover' }} />
        </Col>
        <Col style={{ padding: '0px 8px' }}>
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
