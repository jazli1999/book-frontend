import { useState } from 'react';
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
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {
  useGetUserInfoQuery,
  useUpdateBookCollectionMutation,
  useUpdateWishListMutation,
} from '../../../slices/user.api.slice';
import { useGetBooksMutation } from '../../../slices/book.api.slice';
import { Book } from '../../../components';
import { useParams } from 'react-router';

function getBadge(icon) {
  const containerStyle = {
    background: '#658e49',
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    fontSize: '10pt',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  };
  return <span style={containerStyle}>{icon}</span>;
}

export default function ListEdit() {
  const { listType } = useParams();

  const { data, isFetching, isSuccess } = useGetUserInfoQuery(); // get details of currenty logged in user
  let loadedBookList;

  if (isSuccess) {
    if (listType === 'collection') loadedBookList = data.bookCollection;
    else {
      loadedBookList = data.wishList;
    }
  }

  const [pool, setPool] = useState([]);
  const [edit, setEdit] = useState(false);
  const [bookList, setBookList] = useState([]);

  const [updateBookCollection] = useUpdateBookCollectionMutation();
  const [updateWishList] = useUpdateWishListMutation();
  const [getBook] = useGetBooksMutation();

  const title = listType === 'collection' ? 'Book Collection' : 'Wish List';
  const updateBookList = (updatedBookList) => {
    setBookList(updatedBookList);
    if (listType === 'collection') {
      updateBookCollection(updatedBookList);
    } else {
      updateWishList(updatedBookList);
    }
  };

  const [searchResults, setSearchResults] = useState();

  const onFinish = (values) => {
    getBook(JSON.stringify(values)).then((resp) => {
      if (resp.data.status === 200) {
        setSearchResults(JSON.parse(resp.data.data).searchResult);
      } else {
        message.error('Something went wrong, please try again');
      }
    });

    setPool(searchResults);
    setEdit(true);
    setBookList(loadedBookList);
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Row gutter={10}>
        <Col span={12}>
          <div className="rounded-container" style={{ height: '570px' }}>
            <h4 style={{ margin: '5px 0px 0px 0px' }}>
              Search for books to add to your {title}
            </h4>
            <Form
              form={form}
              name="advanced_search"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              style={{ maxWidth: '700px', marginBottom: '10px' }}
            >
              <Row gutter={5}>
                <Col span={10}>
                  <Form.Item name="isbn" label="ISBN">
                    <Input />
                  </Form.Item>
                  <Form.Item name="author" label="Author">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Form.Item name="title" label="Title">
                    <Input />
                  </Form.Item>
                  <Form.Item name="publisher" label="Publisher">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ width: 'fit-content', margin: 'auto' }}>
                <Button type="primary" htmlType="submit" size="small" style={{ fontSize: '9pt' }}>
                  Search
                </Button>
                <Button
                  style={{
                    margin: '0 8px',
                    fontSize: '9pt',
                  }}
                  onClick={() => {
                    form.resetFields();
                  }}
                  size="small"
                >
                  Clear
                </Button>
              </Row>
            </Form>
            <div>
              <div style={{ marginTop: '5px' }}>
                <List
                  itemLayout="vertical"
                  grid={{ column: 3, gutter: [15, 0] }}
                  size="default"
                  pagination={{
                    pageSize: 9,
                    size: 'small',
                    style: { width: 'fit-content', margin: 'auto' },
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
                        setEdit(true);
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
        <Col span={8}>
          <div className="rounded-container"  style={{ height: '570px' }}>
            <h4 style={{ margin: '5px 0px 0px 0px' }}>Your {' '}{title}</h4>
            <div style={{ marginTop: '5px', marginLeft: '-10px' }}>
              <List
                loading={isFetching}
                itemLayout="vertical"
                grid={{ column: 2, gutter: [0, 0] }}
                size="default"
                pagination={{
                  pageSize: 8,
                  size: 'small',
                  style: { width: 'fit-content', margin: 'auto' },
                  hideOnSinglePage: true,
                }}
                locale={{ emptyText: <Empty /> }}
                dataSource={edit ? bookList : loadedBookList}
                renderItem={(item) => (
                  <a
                    href="#"
                    onClick={() => {
                      if (!edit) {
                        setBookList(loadedBookList);
                        setEdit(true);
                      }

                      const index = bookList.indexOf(item);
                      console.log('deleted element index', index);
                      bookList.splice(index, 1);
                      setPool([...pool, { ...item, exchangeable: true }]);
                      updateBookList(bookList);
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
        <Col span={4}>
          <div className="rounded-container" style={{ height: '570px' }}>
            <h4 style={{ margin: '5px 0px 0px 0px' }}>Removed Books</h4>
          </div>
        </Col>
      </Row>
    </div>
  );
}
