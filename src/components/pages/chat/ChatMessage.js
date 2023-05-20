import React from 'react';
import { AM_PM } from '../../../utils/timeFormats';

const ChatMessage = ({msg, currentContact}) => {
    const {sent_at, text, from} = msg;
    
  return (
    <>
      <div className={from !== currentContact?._id ? 'message-container right-side' : 'message-container'}>
        <p className='message'>{text}</p>
        <span>{AM_PM(sent_at)}</span>
      </div>
    </>
  )
}

export default ChatMessage;