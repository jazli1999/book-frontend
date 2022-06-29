import React from 'react';
import { Avatar, List } from 'antd';
import './index.less';
import { BookList } from '../profilePage';

const chosenBooks = [
  {
    cover:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    mark: 'isFavorite',
  },
  {
    cover:
      'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    mark: 'isFavorite',
  },
];

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'orders/transaction/1',
  title: `Order ${i} title placeholder`,
  avatar:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/480px-Flat_tick_icon.svg.png',
  description: (
    <>
      <b>Username: </b>
      "UsernamePlaceholder"
    </>
  ),
  content: 'Order details placeholder',
}));

function OrderListPage() {
  return (
    <List
      itemLayout="vertical"
      size="medium"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={<BookList title="" bookList={chosenBooks} isEditable={false} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}

export default OrderListPage;
