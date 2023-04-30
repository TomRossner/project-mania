import React, { useEffect, useRef, useState } from 'react';
import ChatInputField from './ChatInputField';
import IconContainer from './common/IconContainer';
import { BiMessageAdd } from 'react-icons/bi';
import SearchBar from './common/SearchBar';
import Contact from './Chat';
import useChat from '../hooks/useChat';
import Conversation from './Conversation';
import useAuth from '../hooks/useAuth';
import { BsSearch } from 'react-icons/bs';
import BlankProfilePicture from './common/BlankProfilePicture';
import ProfilePicture from './common/ProfilePicture';
import { createChat, getChat } from '../httpRequests/http.chat';
import { useDispatch, useSelector } from 'react-redux';
import { setChat, setChats, setCurrentContact } from '../store/chat/chat.actions';
import Chat from './Chat';
import { selectChats } from '../store/chat/chat.selectors';

const Chats = () => {
  const {loadContacts, contacts, createNewChat, loadChat} = useChat();
  const {user, userInfo} = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);

  // Update search value
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

  // Check if inputs match contact names
  const checkContactNames = (searchValue) => {
    const matchingContacts = contacts.filter(contact =>
      contact.first_name.toLowerCase().includes(searchValue)
      || contact.last_name.toLowerCase().includes(searchValue)
      || (contact.first_name.toLowerCase() || contact.last_name.toLowerCase()) === searchValue.toLowerCase()
    );

    setSearchResults(matchingContacts);
  }

  const handleContactClick = async (contact) => {
    // Check if chat exists, if not create new chat
    const chatAlreadyExists = await getChat(userInfo?._id, contact._id);
    if (chatAlreadyExists) {
      loadChat(userInfo?._id, contact._id);
      dispatch(setCurrentContact(contact));
      setIsSearching(false);
      setSearchValue("");
    } else {
      // Create chat
      await createNewChat(userInfo?._id, contact._id);
      dispatch(setCurrentContact(contact));
      setIsSearching(false);
      setSearchValue("");
    }
  }

  // Set isSearching
  useEffect(() => {
    if (inputRef.current && searchValue.length) {
      setIsSearching(true);
    } else setIsSearching(false);
  }, [searchValue]);

  // Check if inputs match contact names
  useEffect(() => {
    if (!searchValue.length) return;
    checkContactNames(searchValue);
  }, [searchValue]);

  // Load contacts
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

        <div className='search-bar-container' ref={inputRef}>
          <input type="text" placeholder={'Search'} value={searchValue} onChange={handleSearchChange}/>
          <IconContainer icon={<BsSearch className='icon'/>}/>
        </div>

        {/* Search results */}
        {isSearching
        ? <div className='contact-search-results'>
            {searchResults.length
            ? searchResults.map(res => (
              <div key={res._id} className='profile' onClick={() => handleContactClick(res)}>
                {res.base64_img_data || res.img_url
                  ? <ProfilePicture src={res.base64_img_data || res.img_url}/>
                  : <BlankProfilePicture/>
                }
                <span>{res.first_name} {res.last_name}</span>
              </div>
            ))
            : null}
          </div>
        : (
          <>
            <h3>Favorites</h3>
            <div className='favorite-contacts'>
              {/* Favorites */}
            </div>

            <div className='chat-contacts'>
              {chats?.map(chat => {
                return (
                  <Chat
                    key={chat._id}
                    contactId={chat.users?.find(uid => uid !== userInfo?._id)}
                    messages={chat.messages}
                  />
                )
              })}
            </div>
          </>
        )}

      </div>

      <div className='right'>
        <Conversation/>
        <ChatInputField/>
      </div>
      
    </div>
  )
}

export default Chats;