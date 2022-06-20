import { Col, Row, Divider } from 'antd';
import PersonalInfo from './PersonalInfo';
import BookList from './BookList';
import dummyData from '../dummyData';

function ProfilePage() {
  const { bookList } = dummyData;
  return (
    <div>
      <h1>My Profile</h1>
      <Row align="top">
        <Col span={7}>

          <PersonalInfo />
        </Col>
        <Divider type="vertical" orientationMargin="100px" />
        <Col span={8}>
          <BookList title="Book Collection" bookList={bookList} isEditable={true}/>
        </Col>
        <Col span={8}>
          <BookList title="Wish List" booklist={[]} isEditable={true}/>
        </Col>
      </Row>

    </div>
  );
}

export default ProfilePage;
