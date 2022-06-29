import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';

const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

function CurrentBookMateList() {
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop
      === ContainerHeight
    ) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="/app/user/profile/1">{item.name.last}</a>}
              description={item.email}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default CurrentBookMateList;
