import React from "react";
import "./index.less";
import {
  FileAddOutlined,
  Col,
  Row,
  List,
  Button,
  Space,
  Empty,
  Divider,
} from "antd";
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
  console.log("props", props);
  return (
    <div>
      {" "}
      <h4>
        <b>Results</b>
      </h4>
      <div className="search-result-list">
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
      <a href={"/app/book/details/" + props.ISBN}>
        <Row style={{ flexFlow: "nowrap" }}>
          <Col>
            <img
              src={props.image}
              alt="cover"
              style={{ height: "110px", width: "70px", objectFit: "cover" }}
            />
          </Col>
          <Col style={{ padding: "0px 8px" }}>
            <p className="shelf-book-title">{props.title}</p>
            <p className="shelf-book-author">{props.authors?.join(", ")}</p>

            <div style={{ position: "absolute", bottom: 2 }}>
              <Space size={4}>
                <p className="add-to-list">Add to List</p>
              </Space>
            </div>
          </Col>
        </Row>
      </a>
    </div>
  );
}
