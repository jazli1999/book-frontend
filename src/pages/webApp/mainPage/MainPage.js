import { List } from 'antd';
import BookmateCard from './BookmateCard';
import { useGetRecommendQuery } from '../../../slices/bookmate.api.slice';

function MainPage() {
  const { data, isSuccess } = useGetRecommendQuery();
  let processedBookmates;

  // calculate the intersection here

  if (isSuccess) {
    processedBookmates = data.map((bookmate) => ({
      name: `${bookmate.firstName} ${bookmate.lastName}`,
      description: bookmate.bio,
      score: Math.trunc(bookmate.score),
      id: bookmate._id,
      bookCollection: bookmate.bookCollection,
      wishList: bookmate.wishList,
      bcCover: bookmate.bcCover,
      bcMark: bookmate.bcMark,
      wsCover: bookmate.wsCover,
      wsMark: bookmate.wsMark,
    }));
  }
  // console.log(processedBookmates);

  return (
    <div id="MainPage">
      <div style={{ padding: '0px 15px' }}>
        <h1>Bookmates Recommended For You</h1>
      </div>
      <List
        loading={!isSuccess}
        dataSource={processedBookmates}
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
