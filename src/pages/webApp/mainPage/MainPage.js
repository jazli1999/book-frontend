import BookmateCard from "./BookmateCard";
import { Col, Row } from "antd";
function MainPage() {

  const bookmateData = [{ name: "Eren G", description: "I love reading", score: 81 },
  { name: "Test User", description: "I love reading too", score: 78 },
  { name: "John Doe", description: "I actually don't like reading", score: 60 }];

  return (
    <div id='MainPage'>
      <div style={{ padding: '0px 15px' }}>
        <h1>Bookmates Recommended For You</h1>
      </div>
      <Row gutter={8}>
        {bookmateData.map((bookmate) => (
          <Col span={8}>
            <BookmateCard bookmateData={bookmate} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MainPage;