import { Col, Row, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PersonalInfo from './PersonalInfo';
import BookList from '../../../components/BookList';
import { useGetUserInfoAsyncMutation } from '../../../slices/user.api.slice';

function ProfilePage() {
  const [getUserInfoAsync] = useGetUserInfoAsyncMutation();
  const [bookCollection, setBookCollection] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [ex, setEx] = useState([]);

  const location = useLocation();

  const mapBC = (item, index) => ({
    ...item,
    author: item.authors[0],
    exchangeable: ex[index],
  });

  const mapWL = (item) => ({
    ...item,
    author: item.authors[0],
  });

  useEffect(() => {
    getUserInfoAsync().then((resp) => {
      setBookCollection(resp.data.bookCollection.map(mapBC));
      setWishList(resp.data.wishList.map(mapWL));
      setEx(resp.data.exchangeableCollection);
    });
  }, [location.key]);

  return (
    <div>
      <h1>My Profile</h1>
      <Row style={{ width: '100%' }}>
        <Col span={7}>
          <PersonalInfo />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={8}>
          <BookList title="Book Collection" bookList={bookCollection} isEditable isCollection isWishList={false} />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={8}>
          <BookList title="Wish List" bookList={wishList} isEditable isCollection={false} isWishList bordered height="520px" />
        </Col>
      </Row>
    </div>
  );
}

export default ProfilePage;
