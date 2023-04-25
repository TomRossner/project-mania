import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChat } from '../store/chat/chat.selectors';
import Spinner from './common/Spinner';
import useChat from '../hooks/useChat';
import Line from './common/Line';
import ChatMessage from './ChatMessage';
import { generateKey } from '../utils/keyGenerator';

const Conversation = () => {
    const {isLoading} = useSelector(selectChat);
    const {currentContact, messages, currentChat, setMessages} = useChat();
    const [contactName, setContactName] = useState('');

    useEffect(() => {
        if (!currentContact) return setContactName('');
        setContactName(`${currentContact.first_name} ${currentContact.last_name}`);
    }, [currentContact]);

    useEffect(() => {
        console.log(messages)
    }, [messages])

    useEffect(() => {
        if (!currentChat) return;
        setMessages([...currentChat.messages]);
    }, [currentChat]);

  return (
    <div className='conversation-container'>
        {contactName && <h1>{contactName}</h1>}
        <Line/>
        <div className='conversation'>
            {isLoading && <Spinner/>}
            {messages?.length ? messages?.map(msg => {
                return <ChatMessage key={generateKey()} msg={msg} currentContact={currentContact}/>
            }) : null}
        </div>
    </div>
  )
}

export default Conversation;