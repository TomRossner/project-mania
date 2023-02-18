import React, { useState, useRef } from 'react';
import {IoMdSend} from "react-icons/io";
import { useParams } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import {generateId} from "../utils/IdGenerator"

const Chat = () => {
  const {task_id} = useParams();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const resetInputValue = () => setInputValue("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    console.log("Handling message");
    const newMessage = {text: inputValue, date_sent: new Date().toDateString(), task: task_id, _id: generateId()};
    setMessages([...messages, newMessage]);
    resetInputValue();
  }

  return (
    <div className='chat-container'>
        <div className='chat-messages-container'>
          <div className='chat-messages'>
            {messages?.map(message => <ChatMessage key={message._id} message={message}/>)}
          </div>
        </div>
        <form className='chat-input-container' onSubmit={handleMessageSubmit}>
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
            <IoMdSend className='icon'/>
          </button>
        </form>
    </div>
  )
}

export default Chat;