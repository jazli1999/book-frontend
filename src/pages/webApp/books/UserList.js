import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import { useGetExchangeableBookOwnersQuery } from '../../../slices/book.api.slice';
import { UserOutlined } from '@ant-design/icons';

const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

function UserList(props) {
  const { data, isSuccess } = useGetExchangeableBookOwnersQuery(props.isbn);

  if (isSuccess) {
    console.log('dataaaaaa', data)

  }
  

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemKey="lastName"
      >
        {(item) => (
          <List.Item >
            <List.Item.Meta
              avatar={<Avatar src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />}
              title={<a href={'/app/user/profile/' + item.userId}> {item.firstName?item.firstName:'Undefined'} {item.lastName?item.lastName:'Undefined'}</a>}
            />
            
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default UserList;
