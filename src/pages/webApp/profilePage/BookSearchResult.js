import React from "react";
import "./index.less";
import {FileAddOutlined,
  Col, Row, List, Button, Space, Empty,Divider
} from 'antd';
import MarkableCover from "../mainPage/MarkableCover";
export default function BookSearchResult(props) {
  console.log("data->", props.resultData);
  return (
    <div>
      <Divider />
      <ResultList books={props.resultData} isEditable={true} />{" "}
    </div>
  );
}


function ResultList(props) {
  return (
    <div>      <h4><b>Results</b></h4>
   
    <div className='search-result-list'>
      <List
        itemLayout="vertical"
        grid={{ column: 3 }}
        size="default"
        pagination={{
          pageSize: 8,
          size: "small",
          style: { width: "fit-content", margin: "auto" },
          hideOnSinglePage: true,
        }}
        dataSource={props.books}
        renderItem={(item) => <Book {...item} />}
      />
    </div>
    </div>
  );
}


function Book(props) {
  return (
    <div className="shelf-book-item">
      <Row style={{ flexFlow: 'nowrap' }}>
        <Col>
          <img src={props.cover} alt="cover" style={{ height: '110px', width: '70px', objectFit: 'cover' }} />
        </Col>
        <Col style={{ padding: '0px 8px' }}>
          <p className="shelf-book-title">{props.title}</p>
          <p className="shelf-book-author">{props.author}</p>
         
            <div style={{ position: 'absolute', bottom: 2 }}>
              <Space size={4}>
                <a className="add-to-list" >Add to List</a>
              </Space> 
            </div>
            
        </Col>
      </Row>
    </div>
  );
}
