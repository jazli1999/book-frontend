import BookmateCard from "./BookmateCard";
import {Col, Row } from "antd";
function MainPage() {


  
  const bookmateData = [{name:"ErenG", descripton:"I love reading", imageSrc:"https://cdn-icons-png.flaticon.com/512/219/219983.png"},
  {name:"TestUser", descripton:"I love reading too", imageSrc:"https://icon-library.com/images/user-png-icon/user-png-icon-16.jpg"},
  {name:"JohnDoe", descripton:"I actually don't like reading", imageSrc:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg31k7M5Wb_hd9h0aQMJFfThv8xwW0uzNhNQ&usqp=CAU"}];




  return (
    <div id='MainPage'>
<div >
    <h1><b>Bookmates Recommended For You  </b></h1>
</div>
<Row gutter={8}>
    <Col span={8}>
    <BookmateCard  bookmateData={bookmateData.at(0)} />
    </Col>
    <Col span={8}>
    <BookmateCard  bookmateData={bookmateData.at(1)}/>
    </Col>
    <Col span={8}>
    <BookmateCard  bookmateData={bookmateData.at(2)}/>
    </Col>
  </Row>

     
    </div>
  )
}

export default MainPage;