import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat } from '../store/chat/chat.selectors';
import Spinner from './common/Spinner';
import useChat from '../hooks/useChat';
import Line from './common/Line';
import ChatMessage from './ChatMessage';
import { generateKey } from '../utils/keyGenerator';
import { socket } from '../utils/socket';

const Conversation = () => {
    const {isLoading} = useSelector(selectChat);
    const {currentContact, messages, currentChat, setMessages} = useChat();
    const [contactName, setContactName] = useState('');
    const dispatch = useDispatch();
    const messagesBottomRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    socket.on('typing', () => setIsTyping(true));
    socket.on('not-typing', () => setIsTyping(false));

    // Set contact name
    useEffect(() => {
        if (!currentContact) return setContactName('');
        setContactName(`${currentContact.first_name} ${currentContact.last_name}`);
    }, [currentContact]);

    // Refresh messages
    useEffect(() => {
        if (!currentChat) return;
        dispatch(setMessages([...currentChat.messages]));
    }, [currentChat, currentContact]);

    

    // Scroll to last message
    const scrollToBottom = () => {
        messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // Scroll to last message
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // socket.on('seen', dispatch(setMessages([...currentChat.messages])));

  return (
    <div className='conversation-container'>
        {contactName && <h1>{contactName}</h1>}
        <Line/>
        <div className='conversation'>
            {isLoading && <Spinner/>}
            {messages?.length ? messages?.map(msg => {
                return <ChatMessage key={generateKey()} msg={msg} currentContact={currentContact}/>
            }) : null}
            <div className='messages-bottom' ref={messagesBottomRef}>
                {isTyping ? <p className='typing'>{currentContact?.first_name} is typing...</p> : null}
            </div>
        </div>
    </div>
  )
}

export default Conversation;