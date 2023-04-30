import React, { useRef, useState, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectCurrentContact } from '../store/chat/chat.selectors';
import useChat from '../hooks/useChat';
import { handleTyping, notifyIsNotTyping, notifyIsTyping, socket } from '../utils/socket';
import Emojis from './Emojis';

const ChatInputField = () => {
    const [inputValue, setInputValue] = useState("");
    const {user} = useAuth()
    const inputRef = useRef();
    const currentContact = useSelector(selectCurrentContact);
    const {currentChat, handleSendMessage} = useChat();
    const [isTyping, setIsTyping] = useState(false);
  
    const handleInputChange = (e) => setInputValue(e.target.value);
  
    const resetInputValue = () => setInputValue("");
  
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        
        if (!inputValue || !currentChat || !currentContact) return;

        const date = new Date();

        const newMessage = {
            text: inputValue,
            from: user._id,
            sent_at: date.toISOString(),
            to: currentContact._id,
        };

        console.log(newMessage.sent_at)

        // Send message
        handleSendMessage(currentChat._id, newMessage);

        resetInputValue();
    }

    // Set isTyping
    useEffect(() => {
        if (!inputValue.length) {
           setIsTyping(false);
           notifyIsNotTyping(currentContact?._id, currentContact?.socket_id);
           return;
        }

        if (isTyping) return;

        setIsTyping(true);

    }, [inputValue]);

    // Notify contact is typing if isTyping is true
    useEffect(() => {
        if (!isTyping) return;

        notifyIsTyping(currentContact?._id, currentContact?.socket_id);
        
    }, [isTyping]);

  return (
    <form id='chat-input-container' onSubmit={handleMessageSubmit}>
        {/* <Emojis setInputValue={setInputValue} inputValue={inputValue}/> */}
        <input
            type="text"
            name="chat_input"
            id="chat_input"
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Type a message..."
            ref={inputRef}
        />
        <button type='submit' className='icon-span' onClick={handleMessageSubmit}>
            <IoMdSend className='icon large'/>
        </button>
    </form>
  )
}

export default ChatInputField;