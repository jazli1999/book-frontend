import PersonalInfo from "./PersonalInfo";
import { Col, Row, Divider } from "antd";
import BookCollection from "./BookCollection";
import WishList from "./WishList";
function ProfilePage() {
  return <div>

<h2 className="center">My Profile</h2>


<Row align="top" >
            <Col span={7}>

            <PersonalInfo/>
            </Col>
            <Divider type="vertical" orientationMargin='100px' />
            <Col span={8} >
            <BookCollection isEditable={true}/>
            </Col>
            <Col span={8} >
            <WishList/>
            </Col>
          </Row>

  </div>;
}

export default ProfilePage;