import React from 'react';

export default function MessageCard(props) {
  const isSender = props.sender === props.user;
  const text = props.message;

  const senderStyle = {
    backgroundColor: '#7ea465',
    color: 'white',
    right: 0,
    marginLeft: 'auto',
  };
  const recevierStyle = {
    backgroundColor: '#e9ece9',
    left: 0,
    marginRight: 'auto',
  };
  const mesStyle = isSender ? senderStyle : recevierStyle;
  return (
    <div className="message" style={mesStyle}>
      <span>
        {text}
      </span>
    </div>
  );
}
