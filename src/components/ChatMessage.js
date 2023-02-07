import React, { useEffect } from 'react';
import {VscTriangleLeft} from "react-icons/vsc";
import IconContainer from "../components/common/IconContainer";

const ChatMessage = ({message}) => {
    const {date_sent, text} = message;

    useEffect(() => {
        if (!message) return;
        console.log(message);
    }, [message])
  return (
    <div className='message-container'>
        <IconContainer icon={<VscTriangleLeft className='icon blue'/>}/>
        <p className='message'>{text}</p>
        <span>Sent {date_sent}</span>
    </div>
  )
}

export default ChatMessage;