import PersonalInfo from "./PersonalInfo";
import { Col, Row } from "antd";
function ProfilePage() {
  return <div>

<h2 className="center">My Profile</h2>


<Row align="top"  justify="space-around">
            <Col span={8}>
            <PersonalInfo/>
            </Col>
            <Col span={8} />

            <Col span={8}>
             
            </Col>
          </Row>

  </div>;
}

export default ProfilePage;