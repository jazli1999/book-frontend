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

  const location = useLocation();

  useEffect(() => {
    getUserInfoAsync().then((resp) => {
      const { exchangeableCollection: exList, bookCollection: oriBC, wishList: oriWL } = resp.data;
      const wl = oriWL.map((item) => ({
        ...item,
        author: item.authors[0],
      }));
      const bc = oriBC.map((item, index) => ({
        ...item,
        author: item.authors[0],
        exchangeable: exList[index],
      }));
      setWishList(wl);
      setBookCollection(bc);
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
