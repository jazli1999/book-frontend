import { Card } from 'antd';
import React from 'react';

export default function MessageCard(props){
    const isSender = props.sender == props.user;
    const text = props.message;
    
    const sender_style = { width: 300,  textAlign: 'center', marginLeft: 'auto', backgroundColor: 'green', color: 'white'}
    const recevier_style = { width: 300,  textAlign: 'center'}
    const mes_style = isSender ? sender_style: recevier_style;
    return(
        <Card style={mes_style}>
            <p> {text} </p>
        </Card>
    );

}
