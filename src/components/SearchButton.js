import React from 'react'
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;


const onSearch = (value) => console.log(value);

export default function SearchButton() {
    return (

      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin:'10px 50px'
      }}>

    <Search
      placeholder="input search text"
      onSearch={onSearch}
    
      
    />
    </div>
)};
