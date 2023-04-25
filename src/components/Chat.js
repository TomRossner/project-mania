import React, { useEffect } from 'react';
import ChatInputField from './ChatInputField';
import IconContainer from './common/IconContainer';
import { BiMessageAdd } from 'react-icons/bi';
import SearchBar from './common/SearchBar';
import Contact from './Contact';
import useChat from '../hooks/useChat';
import Conversation from './Conversation';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const {contacts, loadContacts} = useChat();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) return;

    loadContacts();
}, []);

  return (
    <div className='main-chat-container'>
      <div className='left'>

        <div className='main-chat-title'>
          <h1>Messages</h1>
          <IconContainer icon={<BiMessageAdd className='icon'/>}/>
        </div>

        <SearchBar placeholderText='Search'/>

        <div className='chat-contacts'>
          {contacts?.map(c => <Contact key={c._id} contact={c}/>)}
        </div>

      </div>

      <div className='right'>
        <Conversation/>
        <ChatInputField/>
      </div>
      
    </div>
  )
}

export default Chat;