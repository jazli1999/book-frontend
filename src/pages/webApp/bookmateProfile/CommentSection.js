import React from 'react'
import { Avatar,Comment } from "antd";

const CommentSection = () => {
  return (
    <div><Comment
    author={<a href="/">Han Solo</a>}
    avatar={
      <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
    }
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create
        their product prototypes beautifully and efficiently.
      </p>
    }
    />
      <Comment
    author={<a href="/">Eren Gulum</a>}
    avatar={
      <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
    }
    content={
      <p>
        test comment
      </p>
    }
    /></div>
  )
}

export default CommentSection;