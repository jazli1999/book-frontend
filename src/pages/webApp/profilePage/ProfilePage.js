import { Col, Row, Divider } from 'antd';
import PersonalInfo from './PersonalInfo';
import BookList from '../../../components/BookList';
import dummyData from '../dummyData';

function ProfilePage() {
  const { bookList } = dummyData;

  const wishEmptyTextNode = (
    <div style={{ fontWeight: 400, color: '#8c96a0' }}>
      <div>
        You don't have books
        <br />
        in your wishlist currently
      </div>
      <br />
      <div>
        Go add some
        <br />
        So people who have them
        <br />
        could reach out to you
      </div>
    </div>
  );
  return (
    <div>
      <h1>My Profile</h1>
      <Row align="top">
        <Col span={7}>
          <PersonalInfo />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={8}>
          <BookList title="Book Collection" bookList={bookList} isEditable />
        </Col>
        <Col span={8}>
          <BookList title="Wish List" booklist={[]} emptyTextNode={wishEmptyTextNode} isEditable />
        </Col>
      </Row>

    </div>
  );
}

export default ProfilePage;
