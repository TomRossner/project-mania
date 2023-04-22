import React, { useEffect, useState } from 'react';
import ChatInputField from './ChatInputField';
import IconContainer from './common/IconContainer';
import { BiMessageAdd } from 'react-icons/bi';
import SearchBar from './common/SearchBar';
import Contact from './Contact';
import { getMembers } from '../httpRequests/http.members';
import useAuth from '../hooks/useAuth';

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const {user} = useAuth();

  const loadContacts = async () => {
    const contacts = await getMembers();
    setContacts(contacts.filter(c => c._id !== user._id));
  }

  const loadChat = async (id) => {
    // Load chat
  }

  useEffect(() => {
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
          {contacts?.map(contact => <Contact key={contact._id} contact={contact}/>)}
        </div>

      </div>

      <div className='right'></div>
      
        {/* <ChatInputField/> */}
    </div>
  )
}

export default Chat;