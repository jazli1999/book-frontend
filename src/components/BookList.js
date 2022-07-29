import React from 'react';
import {
  List, Button, Empty,
} from 'antd';
import { useNavigate } from 'react-router';

import { Book } from '.';

export default function BookList(props) {
  const {
    emptyTextNode, column, bookList, pageSize,
  } = props;
  const navigate = useNavigate();

  const editBtnStyle = {
    borderWidth: '1.4px',
    fontSize: '8pt',
    fontWeight: 600,
    height: '22px',
    padding: '0px 15px',
  };

  const listStyle = props.bordered ? {
    borderLeft: 'solid #d2d4d055',
    borderWidth: '1.5px',
    marginLeft: '-10px',
    paddingLeft: '10px',
    height: props.height,
  } : {};

  const handleBookDetailClick = (isbn) => {
    navigate(`/app/book/details/${isbn}`);
  };

  const emptyHint = <Empty description={emptyTextNode} />;
  const columnCount = column || 2;
  return (
    <div style={{ marginTop: '10px', marginBottom: '5px' }}>
      <div className="vertical-center" style={{ marginBottom: '15px' }}>
        <h2 style={{ display: 'inline', marginBottom: '0px' }}>
          {props.title}
        </h2>
        {props.isEditable && props.isCollection && !props.isWishList && (
          <Button className="match-btn" style={editBtnStyle} type="primary" size="small" ghost>
            <a href="/app/profile/collection/edit">
              <span style={{ fontWeight: 700 }}>Edit</span>
              {' '}
            </a>

          </Button>
        )}

        {props.isEditable && !props.isCollection && props.isWishList && (
          <Button className="match-btn" style={editBtnStyle} type="primary" size="small" ghost>
            <a href="/app/profile/wishlist/edit">
              <span style={{ fontWeight: 700 }}>Edit</span>
              {' '}
            </a>

          </Button>
        )}
      </div>
      <div style={listStyle}>
        <List
          itemLayout="vertical"
          grid={{ column: columnCount }}
          size="default"
          pagination={{
            pageSize: pageSize || 4 * columnCount,
            size: 'small',
            style: { width: 'fit-content', margin: 'auto' },
            hideOnSinglePage: true,
          }}
          locale={{ emptyText: emptyHint }}
          dataSource={bookList}
          renderItem={(item) => (
            <a
              role="button"
              onClick={() => {
                handleBookDetailClick(item.ISBN);
              }}
              style={{ color: '#323431' }}
            >
              <Book {...item} showEx />
            </a>
          )}
        />
      </div>
    </div>
  );
}
