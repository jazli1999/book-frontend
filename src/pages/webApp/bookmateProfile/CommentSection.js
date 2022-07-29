import React, { useEffect, useState } from 'react';
import { Avatar, Comment, List } from 'antd';
import { useGetReviewQuery } from '../../../slices/review.api.slice';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

function CommentSection(props) {
  // const { user, hasUser} = useGetUserInfoQuery();
  const [isFetching, setFatching] = useState(false);
  // const [getReviews] = useGetReviewQuery();
  // const [data, setData] = useState([]);

  const { data, hasReviews } = useGetReviewQuery(props.userId);

  if (hasReviews) {
    setFatching(true);
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        size="medium"
        loading={isFetching}
        grid={{ column: 2, gutter: 8 }}
        pagination={{
          pageSize: 8,
          size: 'small',
          style: { width: 'fit-content', margin: 'auto' },
        }}
        dataSource={data}
        renderItem={(item) => (
          <CommentItem item={item} />
        )}
      />
    </div>
  );
}

function CommentItem(props) {
  const { data: reviewer, isSuccess: hasReviewer } = useGetUserInfoQuery(props.item.author);
  const [gotReview, setReview] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (hasReviewer) {
      setLastName(reviewer.lastName);
      setFirstName(reviewer.firstName);
      setReview(true);
    }
  }, [hasReviewer]);

  return (
    <Comment
      loading={gotReview}
      author={(
        <a href={`/app/users/${props.item.author}`}>
          {firstName}
          {' '}
          {lastName}
        </a>
)}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={(
        <p>
          {props.item.content}
        </p>
      )}
    />
  );
}

export default CommentSection;
