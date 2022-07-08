import React from 'react';
import { List, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../slices/order.api.slice';

import './index.less';

function OrderListPage() {
  const { data, isFetching } = useGetUserOrdersQuery();

  return (
    <div style={{ padding: '0px 15px' }}>
      <h1 style={{ marginBottom: '10px' }}>Your Orders</h1>
      <List
        itemLayout="vertical"
        size="medium"
        loading={isFetching}
        grid={{ column: 2, gutter: 8 }}
        pagination={{
          pageSize: 8,
          size: 'small',
          style: { width: 'fit-content', margin: 'auto' },
        }}
        dataSource={data}
        renderItem={(item) => (
          <OrderItem item={item} />
        )}
      />

    </div>
  );
}

function OrderItem(props) {
  const { item } = props;
  const navigate = useNavigate();

  return (
    <List.Item className="list-item" style={{ display: 'grid' }}>
      <span style={{ gridArea: '1 / 1 / 1 / 1' }}>
        <h4>
          Exchange Order with
          {' '}
          {item.bookmate}
        </h4>
        <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }}>
          <Button
            className="match-btn"
            size="default"
            onClick={() => { navigate(`${item.id}`); }}
            style={{ height: '30px', marginLeft: '0px', width: '150px' }}
            type="primary"
            ghost
          >
            <span style={{ fontWeight: 600 }}>View Order Details</span>
          </Button>
          <Button
            type="primary"
            className="match-btn"
            style={{ height: '30px', marginLeft: '0px', width: '150px' }}
          >
            Review Order
          </Button>
        </Space>
      </span>
      <Books books={item.orderedBooks} />
    </List.Item>
  );
}

function Books(props) {
  const { books } = props;
  const renderedBooks = books.slice(0, 3);
  return (
    <Space style={{ gridArea: '1 / 2 / 1 / 2' }}>
      {
        renderedBooks.map((book, index) => (
          <img key={index} src={book} alt="cover" style={{ height: '100px', width: '70px', objectFit: 'cover' }} />
        ))
      }
    </Space>
  );
}

export default OrderListPage;
