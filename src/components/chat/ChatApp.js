import React, { useEffect, useRef, useState } from 'react';
import ChatInputField from './ChatInputField';
import IconContainer from '../common/IconContainer';
import useChat from '../../hooks/useChat';
import Conversation from './Conversation';
import useAuth from '../../hooks/useAuth';
import { BsChevronRight, BsSearch} from 'react-icons/bs';
import BlankProfilePicture from '../common/BlankProfilePicture';
import ProfilePicture from '../common/ProfilePicture';
import { getChat } from '../../httpRequests/http.chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatAsync, setChatSideBarOpen, setContacts, setCurrentContact } from '../../store/chat/chat.actions';
import { setCurrentProject } from '../../store/project/project.actions';
import ChatFavorites from './ChatFavorites';
import SearchBar from '../common/SearchBar';
import ChatContacts from './ChatContacts';
import useProject from '../../hooks/useProject';
import { useNavigate } from 'react-router-dom';
import useMobile from '../../hooks/useMobile';
import {HiOutlineChatBubbleLeftRight} from "react-icons/hi2";
import { selectChatSideBarOpen } from '../../store/chat/chat.selectors';

const ChatApp = () => {
  const {loadContacts, contacts, createNewChat, getContactInfo, currentChat} = useChat();
  const {userInfo} = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const {currentProject} = useProject();
  const navigate = useNavigate();
  const {isMobile} = useMobile();
  const chatSideBarOpen = useSelector(selectChatSideBarOpen);

  // Update search value
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

  // Check if inputs match contact names
  const checkContactNames = (searchValue) => {
    const value = searchValue.toLowerCase();

    const matchingContacts = contacts.filter(contact =>
      contact.first_name.toLowerCase().includes(value)
      || contact.last_name.toLowerCase().includes(value)
      || (contact.first_name.toLowerCase() || contact.last_name.toLowerCase()) === value
      || contact.first_name.toLowerCase() + ' ' + contact.last_name.toLowerCase() === value
    );
    
    // Set search results
    setSearchResults(matchingContacts);
  }

  // Check if chat exists, if not create new chat
  const handleContactClick = async (contact) => {

    // Check if exists
    const chatAlreadyExists = await getChat(userInfo?._id, contact._id);

    if (chatAlreadyExists) {
      getContactInfo(userInfo?._id, contact._id);

      dispatch(setCurrentContact(contact));

      setIsSearching(false);
      setSearchValue("");
    } else {
      // Create chat
      await createNewChat(userInfo?._id, contact);

      dispatch(setCurrentContact(contact));

      setIsSearching(false);
      setSearchValue("");
    }
  }

  // Refresh current chat
  const refreshCurrentChat = () => {
    dispatch(fetchChatAsync(currentChat.users[0], currentChat.users[1]));
  }

  // Toggle chat side bar
  const toggleChatSideBar = () => {
    dispatch(setChatSideBarOpen(!chatSideBarOpen));
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

  // Set currentProject to null
  useEffect(() => {
    if (currentProject) dispatch(setCurrentProject(null));
  }, []);

  // Remove current user from contacts
  useEffect(() => {
    if (!contacts.length) return;

    const isInContacts = contacts.some(contact => contact._id === userInfo?._id);

    if (isInContacts) {
      dispatch(setContacts([...contacts.filter(c => c._id !== userInfo?._id)]));
    }
    
  }, [contacts]);

  useEffect(() => {
    if (!userInfo) return;

    // Load contacts
    loadContacts();

    // Refresh current chat
    if (currentChat) {
      refreshCurrentChat();
    } else dispatch(setChatSideBarOpen(true));
  }, []);

  // Redirect to homepage
  useEffect(() => {
    if (!userInfo) navigate('/');
  }, []);

  return (
    <div className='main-chat-container'>
      <div className={chatSideBarOpen ? 'left open' : 'left'}>
        <IconContainer icon={<BsChevronRight className='icon'/>} additionalClass={isMobile ? 'mobile' : 'not-mobile'} onClick={toggleChatSideBar}/>

        <div className='main-chat-title'>
          <IconContainer icon={<HiOutlineChatBubbleLeftRight className='icon'/>}/>
          <h1>Chat</h1>
        </div>

        <SearchBar
          type="text"
          refValue={inputRef}
          placeholderText='Search'
          fn={handleSearchChange}
          value={searchValue}
          icon={<IconContainer icon={<BsSearch className='icon'/>}/>}
        />

        {isSearching
        ? <div className='chat-search-results'>
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
            <ChatFavorites/>
            <ChatContacts/>
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

export default ChatApp;