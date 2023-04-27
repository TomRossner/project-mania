import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const ChatMessage = ({msg, currentContact}) => {
    const {sent_at, text, from, to} = msg;
    // const {userInfo} = useAuth();

    useEffect(() => {
        if (!msg) return;
        console.log(msg.text);
    }, [msg])
    
  return (
    <>
      <div className={from === currentContact._id ? 'message-container' : 'message-container rightside'}>
        <p className='message'>{text}</p>
        <span>Sent {sent_at}</span>
      </div>
    </>
  )
}

export default ChatMessage;