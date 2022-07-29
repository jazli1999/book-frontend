import React, { useState } from 'react';
import { List, message } from 'antd';
import { useParams, useNavigate } from 'react-router';
import { useGetBooksMutation } from '../../../slices/book.api.slice';
import { Book } from '../../../components';

function BookSearchResultPage() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [getBooks, { isLoading }] = useGetBooksMutation();
  const [books, setBooks] = useState();
  const [initialized, setInitialized] = useState(false);

  const handleBookDetailClick = (isbn) => {
    navigate(`/app/book/details/${isbn}`);
  };

  const searchContent = { title: keyword };
  if (!initialized) {
    setInitialized(true);
    getBooks(JSON.stringify(searchContent)).then((resp) => {
      if (resp.data.status === 200 && !initialized) {
        const result = JSON.parse(resp.data.data).searchResult.map((item) => ({
          ...item,
          author: item.authors[0],
        }));
        setBooks(result);
      } else {
        message.error('Something went wrong, please try agina');
      }
    });
  }

  return (
    <div id="BookSearchResultPage">
      <div style={{ padding: '0px 15px' }}>
        <h1>Search Result</h1>
      </div>
      <List
        loading={isLoading}
        dataSource={books}
        grid={{ column: 3 }}
        size="default"
        pagination={{
          pageSize: 12,
          size: 'small',
          style: { width: 'fit-content', margin: 'auto' },
        }}
        renderItem={(item) => (
          <a
            role="button"
            onClick={() => {
              handleBookDetailClick(item.ISBN);
            }}
            style={{ color: '#323431' }}
          >
            <Book {...item} />
          </a>
        )}
      />
    </div>
  );
}

export default BookSearchResultPage;
