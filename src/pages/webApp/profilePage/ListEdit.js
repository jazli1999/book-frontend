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
  Modal,
  message,
} from 'antd';
import { PlusOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import {
  useGetUserInfoQuery,
  useUpdateBookCollectionMutation,
  useUpdateWishListMutation,
} from '../../../slices/user.api.slice';
import { useGetBooksMutation } from '../../../slices/book.api.slice';
import { Book } from '../../../components';

function getBadge(icon) {
  const containerStyle = {
    background: '#658e49',
    width: '15px',
    height: '15px',
    borderRadius: '10px',
    fontSize: '8pt',
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

  const { data, isFetching, isSuccess } = useGetUserInfoQuery();
  const { confirm } = Modal;

  const [bookList, setBookList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [removedList, setRemovedList] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  const [updateBookCollection] = useUpdateBookCollectionMutation();
  const [updateWishList] = useUpdateWishListMutation();
  const [getBook] = useGetBooksMutation();

  if (!initialized && isSuccess) {
    const books = [];
    const { exchangeableCollection: ex, bookCollection: collection, wishList: wish } = data;
    const rawBooks = listType === 'collection' ? collection : wish;
    for (const [index, book] of rawBooks.entries()) {
      books.push({
        ...book,
        author: book.authors[0],
        exchangeable: ex[index],
      });
    }
    setBookList(books);
    setInitialized(true);
  }

  const title = listType === 'collection' ? 'Book Collection' : 'Wish List';

  const onSave = () => {
    const updateBookList = listType === 'collection' ? updateBookCollection : updateWishList;
    updateBookList(bookList).then((resp) => {
      if (resp.data.status === 200) {
        message.success(`${title} Updated`);
        navigate('/app/profile');
      } else {
        message.error('Something went wrong, please try again');
      }
    });
  };

  const showConfirm = () => {
    confirm({
      title: 'All changes will be discarded, continue?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Discard',
      okType: 'danger',
      onOk() {
        navigate('/app/profile', { refresh: true });
      },
    });
  };

  const onFinish = (values) => {
    getBook(JSON.stringify(values)).then((resp) => {
      if (resp.data.status === 200) {
        const result = JSON.parse(resp.data.data).searchResult.map((item) => ({
          ...item,
          author: item.authors[0],
        }));
        setSearchResults(result);
      } else {
        message.error('Something went wrong, please try again');
      }
    });
    // setPool(searchResults);
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Row gutter={10}>
        <Col span={12}>
          <div className="rounded-container" style={{ height: '570px' }}>
            <h4 style={{ margin: '5px 0px 0px 0px' }}>
              Search for books to add to your
              {' '}
              {title}
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
                  locale={{ emptyText: <Empty description="Search result will show up here" /> }}
                  pagination={{
                    pageSize: 9,
                    size: 'small',
                    style: { width: 'fit-content', margin: 'auto' },
                    hideOnSinglePage: true,
                  }}
                  dataSource={searchResults}
                  renderItem={(item) => (
                    <a
                      href="#"
                      onClick={() => {
                        const index = searchResults.indexOf(item);
                        searchResults.splice(index, 1);
                        setSearchResults(searchResults);
                        const newAdded = [
                          ...bookList,
                          { ...item, exchangeable: false },
                        ];
                        setBookList(newAdded);
                      }}
                    >
                      <Badge count={getBadge(<PlusOutlined />)} offset={[-6, 4]}>
                        <div style={{ width: '100%' }}>
                          <Book {...item} />
                        </div>
                      </Badge>
                    </a>
                  )}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="rounded-container" style={{ height: '570px', padding: '6px 3px 6px 14px' }}>
            <h4 style={{ margin: '5px 0px 0px 0px', display: 'inline-block' }}>
              Your
              {' '}
              {title}
            </h4>
            <Button
              className="match-btn"
              size="small"
              type="danger"
              onClick={showConfirm}
              ghost
            >
              Cancel
            </Button>
            <Button
              className="match-btn"
              size="small"
              type="primary"
              onClick={onSave}
              style={{ marginLeft: '8px' }}
            >
              Save
            </Button>
            <div style={{ marginTop: '5px', marginLeft: '-10px' }}>
              <List
                loading={isFetching}
                itemLayout="vertical"
                grid={{ column: 2 }}
                size="default"
                pagination={{
                  pageSize: 8,
                  size: 'small',
                  style: { width: 'fit-content', margin: 'auto' },
                  hideOnSinglePage: true,
                }}
                locale={{ emptyText: <Empty /> }}
                dataSource={bookList}
                renderItem={(item) => (
                  <a
                    href="#"
                    onClick={() => {
                      const index = bookList.indexOf(item);
                      console.log('deleted element index', index);
                      bookList.splice(index, 1);
                      const newRemoved = [
                        ...removedList,
                        {
                          ...item,
                          exchangeable: false,
                        },
                      ];
                      setRemovedList(newRemoved);
                    }}
                  >
                    <Badge count={getBadge(<MinusOutlined />)} offset={[-6, 4]}>
                      <Book {...item} />
                    </Badge>
                  </a>
                )}
              />
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className="rounded-container" style={{ height: '570px', padding: '6px 3px 6px 5px' }}>
            <h4 style={{ margin: '5px 6px 0px 9px' }}>Removed Books</h4>
            <div style={{ marginTop: '5px' }}>
              <List
                itemLayout="vertical"
                grid={{ column: 1 }}
                size="default"
                pagination={{
                  pageSize: 4,
                  size: 'small',
                  style: { width: 'fit-content', margin: 'auto' },
                  hideOnSinglePage: true,
                }}
                locale={{ emptyText: <Empty description="Removed books can be found here and added again" /> }}
                dataSource={removedList}
                renderItem={(item) => (
                  <a
                    href="#"
                    onClick={() => {
                      const index = removedList.indexOf(item);
                      removedList.splice(index, 1);
                      setRemovedList(removedList);
                      const newAdded = [
                        ...bookList,
                        { ...item, exchangeable: false },
                      ];
                      setBookList(newAdded);
                    }}
                  >
                    <Badge count={getBadge(<PlusOutlined />)} offset={[-6, 4]}>
                      <div style={{ width: '100%' }}>
                        <Book {...item} />
                      </div>
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
