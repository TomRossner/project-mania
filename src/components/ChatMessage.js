import React from 'react';
import { messageTime } from '../utils/timeFormats';

const ChatMessage = ({msg, currentContact}) => {
    const {sent_at, text, from} = msg;
    
  return (
    <>
      <div className={from === currentContact._id ? 'message-container' : 'message-container rightside'}>
        <p className='message'>{text}</p>
        <span>{messageTime(sent_at)}</span>
      </div>
    </>
  )
}

export default ChatMessage;