import {
  Avatar, List, Spin,
} from 'antd';
import VirtualList from 'rc-virtual-list';
import { useGetExchangeableBookOwnersQuery } from '../../../slices/book.api.slice';

const ContainerHeight = 400;

function UserList(props) {
  const { data, isSuccess, isFetching } = useGetExchangeableBookOwnersQuery(
    props.isbn,
  );

  return (
    <div>
      {isFetching && <Spin />}
      {isSuccess && (
        <List>
          <VirtualList data={data} height={ContainerHeight} itemKey="userId">
            {(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
                  }
                  title={(
                    <a href={`/app/users/${item.userId}`}>
                      {' '}
                      {item.firstName ? item.firstName : 'Undefined'}
                      {' '}
                      {item.lastName ? item.lastName : 'Undefined'}
                    </a>
                  )}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      )}
    </div>
  );
}

export default UserList;
