import React from 'react';
import {
  List, Button, Empty,
} from 'antd';
import { Book } from '.';

export default function BookList(props) {
  const { emptyTextNode, column, bookList } = props;

  const editBtnStyle = {
    borderWidth: '1.4px',
    fontSize: '8pt',
    fontWeight: 600,
    height: '22px',
    padding: '0px 15px',
  };

  const emptyHint = <Empty description={emptyTextNode} />;
  const columnCount = column || 2;
  return (
    <div style={{ marginTop: '10px', marginBottom: '5px' }}>
      <div className="vertical-center" style={{ marginBottom: '15px' }}>
        <h2 style={{ display: 'inline', marginBottom: '0px' }}>
          {props.title}
        </h2>
        {props.isEditable && (
        <Button className="match-btn" style={editBtnStyle} type="primary" size="small" ghost>
          <span style={{ fontWeight: 700 }}>Edit</span>
        </Button>
        ) }
      </div>
      <div>
        <List
          itemLayout="vertical"
          grid={{ column: columnCount }}
          size="default"
          pagination={{
            pageSize: 4 * columnCount,
            size: 'small',
            style: { width: 'fit-content', margin: 'auto' },
            hideOnSinglePage: true,
          }}
          locale={{ emptyText: emptyHint }}
          dataSource={bookList}
          renderItem={(item) => <Book {...item} />}
        />
      </div>
    </div>
  );
}
