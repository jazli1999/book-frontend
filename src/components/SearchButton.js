import React, { useState } from 'react';
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

  const [keyword, setKeyword] = useState('');

  const onPressEnter = () => {
    console.log(keyword);
    const a = document.createElement('a');
    a.href = `/app/search/${keyword}`;
    a.click();
  };

  return (
    <Input
      placeholder="Search title"
      style={searchStyle}
      onPressEnter={onPressEnter}
      onChange={(e) => { setKeyword(e.target.value); }}
      suffix={
        <SearchOutlined style={{ color: '#839c88' }} />
      }
    />
  );
}
