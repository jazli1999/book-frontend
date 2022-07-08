import {
  Row, Col,
} from 'antd';

import BookList from '../../../components/BookList';
import dummyData from '../dummyData';

function PickBookModal() {
  // const { bookmateId } = props;
  const { bookList } = dummyData;
  return (
    <Row gutter={[8, 0]}>
      <Col span={6}>
        <div className="rounded-container" style={{ marginBottom: 0 }}>
          <h4 style={{ marginBottom: 0 }}>You want:</h4>
          <div style={{ marginTop: '-20px' }}>
            <BookList
              column={1}
              bookList={bookList.slice(0, 2)}
              emptyTextNode={<span>Nothing here</span>}
            />
          </div>
        </div>
      </Col>
      <Col span={18}>
        <div className="rounded-container" style={{ marginBottom: 0 }}>
          <h4 style={{ marginBottom: 0 }}>Exchangeable Collection</h4>
          <div style={{ marginTop: '-20px' }}>
            <BookList
              column={3}
              bookList={bookList.filter((book) => book.exchangeable)}
              emptyTextNode={<span>Nothing here</span>}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default PickBookModal;
