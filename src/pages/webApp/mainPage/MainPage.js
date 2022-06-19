import { List } from 'antd';
import BookmateCard from './BookmateCard';
import dummyData from '../dummyData';

function MainPage() {
  const { bookmateData } = dummyData;

  return (
    <div id="MainPage">
      <div style={{ padding: '0px 15px' }}>
        <h1>Bookmates Recommended For You</h1>
      </div>
      <List
        dataSource={bookmateData}
        grid={{ column: 3 }}
        size="default"
        pagination={{
          pageSize: 6,
          size: 'small',
          style: { width: 'fit-content', margin: 'auto' },
        }}
        renderItem={(item) => <BookmateCard bookmateData={item} />}
      />
    </div>
  );
}

export default MainPage;
