import { Col, Row, Divider } from 'antd';
import PersonalInfo from './PersonalInfo';
import BookList from '../../../components/BookList';
import dummyData from '../dummyData';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

function ProfilePage() {
  const { data, isSuccess } = useGetUserInfoQuery();
  let bookCollection;
  let wishList;
  if(isSuccess){
    bookCollection = data.bookCollection
    wishList = data.wishList
  }
  return (
    <div>
      <h1>My Profile</h1>
      <Row align="top">
        <Col span={7}>

          <PersonalInfo />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={7}>
          <BookList title="Book Collection" bookList={bookCollection} isEditable isCollection isWishList={false} />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />

        <Col span={7}>
          <BookList title="Wish List" bookList={wishList} isEditable isCollection={false} isWishList />
        </Col>
      </Row>

    </div>
  );
}

export default ProfilePage;
