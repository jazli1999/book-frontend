import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchButton() {
  const searchStyle = {
    background: '#fbfdfb',
    borderRadius: '5px',
    width: '320px',
    margin: 'auto',
    height: '32px',
  };

  const onPressEnter = () => {
    console.log('Search Triggered');
  }

  return (
    <Input
      placeholder="Search"
      style={searchStyle}
      onPressEnter={onPressEnter}
      suffix={
          <SearchOutlined style={{ color: '#839c88' }} />
      }
    />
  )
};
