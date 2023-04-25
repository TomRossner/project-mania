import React, { useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectCurrentContact } from '../store/chat/chat.selectors';
import useChat from '../hooks/useChat';
import { socket } from '../utils/socket';

const ChatInputField = () => {
    const [inputValue, setInputValue] = useState("");
    const {user} = useAuth()
    const inputRef = useRef();
    const currentContact = useSelector(selectCurrentContact);
    const {currentChat, handleSendMessage} = useChat();
  
    const handleInputChange = (e) => setInputValue(e.target.value);
  
    const resetInputValue = () => setInputValue("");
  
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        
        if (!inputValue) return;

        console.log("Handling message");

        const newMessage = {
            text: inputValue,
            sent_at: new Date().toDateString(),
            from: user._id,
            to: currentContact._id
        };

        // socket.emit('message', {...newMessage, chatId: currentChat._id, target_socket_id: currentContact.socket_id});
        handleSendMessage(newMessage);

        resetInputValue();
    }

  return (
    <form id='chat-input-container' onSubmit={handleMessageSubmit}>
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