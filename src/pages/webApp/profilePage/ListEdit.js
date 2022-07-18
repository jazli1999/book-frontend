import { useState } from "react";
import {
  Row,
  Col,
  Badge,
  List,
  Empty,
  Button,
  Form,
  Input,
  message,
  Divider,
  Space,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  useGetUserInfoQuery,
  useUpdateBookCollectionMutation,
  useUpdateWishListMutation,
} from "../../../slices/user.api.slice";
import { useGetBooksMutation } from "../../../slices/book.api.slice";
import { Book } from "../../../components";

function getBadge(icon) {
  const containerStyle = {
    background: "#658e49",
    width: "20px",
    height: "20px",
    borderRadius: "10px",
    fontSize: "10pt",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  };
  return <span style={containerStyle}>{icon}</span>;
}

export default function ListEdit(props) {
  const { listType } = props;

  const { data, isFetching, isSuccess } = useGetUserInfoQuery(); //get details of currenty logged in user
  let loadedBookList;

  if (isSuccess) {
    if(listType=='collection')
    loadedBookList = data.bookCollection;
    else{
      loadedBookList = data.wishList;
    }
  }

  const [pool, setPool] = useState([]);
  const [edit, setEdit] = useState(false);
  const [bookList, setBookList] = useState([]);

  const [updateBookCollection] = useUpdateBookCollectionMutation();
  const [updateWishList] = useUpdateWishListMutation();
  const [getBook] = useGetBooksMutation();

  const updateBookList = (updatedBookList) => {
    console.log("update is on", updatedBookList);
    setBookList(updatedBookList);
    if(listType=='collection'){
      updateBookCollection(updatedBookList);
    }
    else{
      updateWishList(updatedBookList)
    }
   
  };

  const [searchResults, setSearchResults] = useState();

  const onFinish = (values) => {
    getBook(JSON.stringify(values)).then((resp) => {
      if (resp.data.status === 200) {
        setSearchResults(JSON.parse(resp.data.data).searchResult);
      } else {
        message.error("Something went wrong, please try again");
      }
    });

    setPool(searchResults);
    setEdit(true)
    setBookList(loadedBookList)
  };

  const [form] = Form.useForm();

  const getFields = () => {
    const children = [];

    children.push(
      <Col span={10} key={1}>
        <Form.Item name="isbn" label="ISBN">
          <Input />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key={2}>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key={3}>
        <Form.Item name="author" label="Author">
          <Input />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={10} key={4}>
        <Form.Item name="publisher" label="Publisher">
          <Input />
        </Form.Item>
      </Col>
    );
    return children;
  };

  return (
    <div>
      <Row>
     <Col span={12}>
      <div>
 
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
        >
          <Row gutter={24}>{getFields()}</Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "right",
              }}
            >
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
        <Divider ></Divider>

          <div
            className="rounded-container"
            style={{ marginBottom: 0, minHeight: "440px" }}
          >
            <h4 style={{ marginBottom: 0 }}>
              Search Results
            </h4>
            <div style={{ marginTop: "5px" }}>
              <List
                itemLayout="vertical"
                grid={{ column: 3, gutter: [15, 0] }}
                size="default"
                pagination={{
                  pageSize: 12,
                  size: "small",
                  style: { width: "fit-content", margin: "auto" },
                  hideOnSinglePage: true,
                }}
                locale={{ emptyText: <Empty /> }}
                dataSource={pool}
                renderItem={(item) => (
                  <a
                    href="#"
                    onClick={() => {
                        const index = pool.indexOf(item);
                        pool.splice(index, 1);
                        setPool(pool);
                        const newAdded = [
                          ...bookList,
                          { ...item, exchangeable: false },
                        ];
                        updateBookList(newAdded);
                        setEdit(true)        

                      
                    }}
                  >
                    <Badge count={getBadge(<PlusOutlined />)} offset={[-5, 5]}>
                      <Book {...item} className="disabled" />
                     
                    </Badge>
                  </a>
                )}
              />
            </div>
          </div>
    
      </div>
      </Col>
      <Divider type="vertical"></Divider>
        <Col span={10}>
          <div
            className="rounded-container"
            style={{ marginBottom: 0, minHeight: "440px", minWidth: "220px" }}
          >
            <h4 style={{ marginBottom: 0 }}>Your List:</h4>
            <div style={{ marginTop: "5px", marginLeft: "-10px" }}>
              <List
                loading={isFetching}
                itemLayout="vertical"
                grid={{ column: 2 }}
                size="default"
                pagination={{
                  pageSize: 10,
                  size: "small",
                  style: { width: "fit-content", margin: "auto" },
                  hideOnSinglePage: true,
                }}
                locale={{ emptyText: <Empty /> }}
                dataSource={edit ? bookList : loadedBookList}
                renderItem={(item) => (
                  <a
                    href="#"
                    onClick={() => {
                      if(!edit){
                        setBookList(loadedBookList)
                        setEdit(true)
                      }
                     
                      const index = bookList.indexOf(item);
                      console.log("deleted element index", index);
                      bookList.splice(index, 1);
                      setPool([...pool, { ...item, exchangeable: true }]);
                      updateBookList(bookList)
                    
                    }}
                  >
                    <Badge count={getBadge(<MinusOutlined />)} offset={[-5, 5]}>
                      <Book {...item} />
                      
                    </Badge>
                  </a>
                )}
              />
            </div>
          </div>
        </Col>
        </Row>
    </div>
  );
}
