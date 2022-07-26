import React, { useEffect, useState } from 'react';
import { Avatar, Comment, List } from 'antd';
import { useGetReviewQuery } from '../../../slices/review.api.slice';
import { useGetUserInfoQuery } from '../../../slices/user.api.slice';

function CommentSection() {
  const { user, hasUser} = useGetUserInfoQuery();
  const { isFetching, setFatching } = useState(false);
  const [getReviews] = useGetReviewQuery;
  const [data,setData] = useState([]);

  useEffect(()=>{
    if(hasUser){
      getReviews(user._id).then( (data)=>{
        setData(data);
        setFatching(true);
      });
    }
  }, [hasUser])
  
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

function CommentItem(props){
  const { reviewer, hasReviewer} = useGetUserInfoQuery(props.author);
  <Comment
      loading ={hasReviewer}
      author={<a href="/">{reviewer.firstName} {reviewer.lastName}</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
    }
      content={(
        <p>
          {props.content}
        </p>
    )}
  />
}

export default CommentSection;
