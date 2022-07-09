import { useState } from 'react';
import {
  Row, Col, Badge, List, Empty,
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

import { Book } from '../../../components';

function getBadge(icon) {
  const containerStyle = {
    background: '#658e49',
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    fontSize: '10pt',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  };
  return (
    <span style={containerStyle}>
      {icon}
    </span>
  );
}

function PickBookModal(props) {
  const { bookmateId, updateList } = props;
  const [added, setAdded] = useState([]);
  const [pool, setPool] = useState([]);
  const { data, isFetching, isSuccess } = useGetUserInfoQuery(bookmateId);
  const [initialized, setInitialized] = useState(false);

  console.log(initialized, isSuccess);
  if (!initialized && isSuccess) {
    const bookList = [];
    const { exchangeableCollection: ex, bookCollection: books } = data;
    for (const [index, book] of books.entries()) {
      if (ex[index]) {
        bookList.push({
          id: book._id,
          title: book.title,
          author: book.authors[0],
          image: book.image,
          exchangeable: true,
          added: false,
        });
      }
    }
    console.log(bookList);
    setPool(bookList);
    setInitialized(true);
  }

  return (
    <Row gutter={[8, 0]} style={{ width: '100%' }}>
      <Col span={6}>
        <div className="rounded-container" style={{ marginBottom: 0, minHeight: '440px', minWidth: '220px' }}>
          <h4 style={{ marginBottom: 0 }}>You want:</h4>
          <div style={{ marginTop: '5px', marginLeft: '-10px' }}>
            <List
              itemLayout="vertical"
              grid={{ column: 1, gutter: [0, 0] }}
              size="default"
              pagination={{
                pageSize: 3,
                size: 'small',
                style: { width: 'fit-content', margin: 'auto' },
                hideOnSinglePage: true,
              }}
              locale={{ emptyText: <Empty /> }}
              dataSource={added}
              renderItem={(item) => (
                <a
                  href="#"
                  onClick={() => {
                    const index = added.indexOf(item);
                    added.splice(index, 1);
                    setPool([...pool, { ...item, exchangeable: true }]);
                    setAdded(added);
                    updateList(added);
                  }}
                >
                  <Badge count={getBadge(<MinusOutlined />)} offset={[-5, 5]}>
                    <Book {...item} />
                  </Badge>
                </a>
              )}
            />
          </div>
        </div>
      </Col>
      <Col span={18}>
        <div className="rounded-container" style={{ marginBottom: 0, minHeight: '440px' }}>
          <h4 style={{ marginBottom: 0 }}>Your Bookmate's Exchangeable Collection</h4>
          <div style={{ marginTop: '5px' }}>
            <List
              loading={isFetching}
              itemLayout="vertical"
              grid={{ column: 3, gutter: [15, 0] }}
              size="default"
              pagination={{
                pageSize: 12,
                size: 'small',
                style: { width: 'fit-content', margin: 'auto' },
                hideOnSinglePage: true,
              }}
              locale={{ emptyText: <Empty /> }}
              dataSource={pool}
              renderItem={(item) => (
                <a
                  href="#"
                  onClick={() => {
                    if (!item.added) {
                      const index = pool.indexOf(item);
                      pool.splice(index, 1);
                      setPool(pool);
                      const newAdded = [...added, { ...item, exchangeable: false }];
                      setAdded(newAdded);
                      updateList(newAdded);
                    }
                  }}
                >
                  <Badge count={getBadge(<PlusOutlined />)} offset={[-5, 5]}>
                    <Book {...item} className="disabled" />
                  </Badge>
                </a>
              )}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default PickBookModal;
