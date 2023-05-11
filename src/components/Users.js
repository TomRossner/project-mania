import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from './common/BackButton';
import SearchBar from './common/SearchBar';
import { fetchMembersAsync } from '../store/members/members.actions';
import Line from './common/Line';
import useAuth from '../hooks/useAuth';
import UserTab from './UserTab';
import { generateKey } from '../utils/keyGenerator';
import useProject from '../hooks/useProject';
import {BsChatLeftText, BsPlus, BsSearch} from "react-icons/bs";
import IconContainer from './common/IconContainer';
import { IoPersonCircleOutline } from 'react-icons/io5';
import useMobile from '../hooks/useMobile';
import { fetchChatAsync, setCurrentContact } from '../store/chat/chat.actions';
import { useNavigate } from 'react-router-dom';
import { selectChats } from '../store/chat/chat.selectors';
import useChat from '../hooks/useChat';
import { AiOutlineMinus } from 'react-icons/ai';
import useMembers from '../hooks/useMembers';

const Users = () => {
  const {members} = useMembers();
  const {user, userInfo} = useAuth();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {
    currentProject,
    handleAddMember,
    handleRemoveMemberFromProject,
    isAdmin
  } = useProject();
  const {isMobile} = useMobile();
  const navigate = useNavigate();
  const chats = useSelector(selectChats);
  const {createNewChat, fetchUserChats} = useChat();

  // Check search input
  const checkSearchInput = (input) => {
    if (members.some(member => member.first_name.toLowerCase().includes(input.toLowerCase()) ||
      member.last_name.toLowerCase().includes(input.toLowerCase()))
    ) {
      const matchingUsers = [...members?.filter(member => member.first_name.toLowerCase().includes(input.toLowerCase()) ||
      member.last_name.toLowerCase().includes(input.toLowerCase()))];
      setSearchResults([...matchingUsers]);
    }
  }

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleViewProfile = (userId) => {/////////////////////////////////////////////////////////////////////////// TODO
    // Open user profile
  }

  // Handle start chat
  const handleStartChat = (contactId) => {
    
    // Get contact and set to currentContact
    const contact = members.find(m => m._id === contactId);
    dispatch(setCurrentContact(contact));

    // Check if chat exists
    const chatExists = chats?.some(chat => chat.users.some(uid => uid === contactId));

    // If not, create new chat
    if (!chatExists) return createNewChat(userInfo?._id, contact);

    // Start chat
    dispatch(fetchChatAsync(userInfo?._id, contactId));
    navigate(`/chat/${userInfo?._id}`);
  }

  // Check search input
  useEffect(() => {
    if (!inputValue.length) setSearchResults([]);
    checkSearchInput(inputValue);
  }, [inputValue]);

  // Fetch all users and all current user's chats
  useEffect(() => {
    dispatch(fetchMembersAsync());
    fetchUserChats();
  }, []);

  useEffect(() => {
    console.log('isAdmin: ', isAdmin);
  }, [isAdmin]);

  return (
      <>
        <div className='users-container'>

          <BackButton/>

          <div className='title'>
            <h1>Users</h1>
            <SearchBar value={inputValue} fn={handleInputChange} placeholderText={"Search users"} icon={<IconContainer icon={<BsSearch className='icon'/>}/>}/>
          </div>

            <div className='results-container'>
              <p>{members?.filter(member => member._id !== user?._id).length} {members?.filter(member => member._id !== user?._id).length === 1 ? "user found": "users found"}</p>
              <Line/>
              {searchResults.length
                ? <>
                    {searchResults?.filter(member => member._id !== user?._id).map(member => {
                      return (
                        <div key={generateKey()} className='search-result'>
                          <UserTab user={member}/>
                          <div className='buttons-container'>

                            <button className='btn white' onClick={() => handleStartChat(member._id)} title={`Chat with ${member.first_name}`}>
                              <IconContainer icon={<BsChatLeftText className='icon'/>}/>
                              {isMobile ? '' : ' Message'}
                            </button>

                            <button className='btn white' onClick={() => handleViewProfile(member._id)} title={`View ${member.first_name}'s profile`}>
                              <IconContainer icon={<IoPersonCircleOutline className='icon xl'/>}/>
                              {isMobile ? '' : ' View profile'}
                            </button>

                            {currentProject?.members?.some(m => m._id === member._id)
                              && isAdmin
                              &&  <button className='btn white' title={`Remove ${member.first_name} from project`} onClick={() => handleRemoveMemberFromProject(member._id)}>
                                    <IconContainer icon={<AiOutlineMinus className='icon'/>}/>{isMobile ? '' : ' Remove from project'}
                                  </button>
                            }

                            {!currentProject?.members?.some(m => m._id === member._id)
                              && isAdmin
                              &&  <button className='btn white' title={`Add ${member.first_name} to project`} onClick={() => handleAddMember(member)}>
                                    <IconContainer icon={<BsPlus className='icon xl'/>}/>{isMobile? '' : ' Add to project'}
                                  </button>
                            }
                          </div>
                        </div>
                      )
                    })}
                  </>
                : members?.filter(m => m._id !== user?._id).map(member => {
                  return (
                    <div key={generateKey()} className='search-result'>
                      <UserTab user={member}/>
                      <div className='buttons-container'>

                        <button className='btn white' onClick={() => handleStartChat(member._id)} title={`Chat with ${member.first_name}`}>
                          <IconContainer icon={<BsChatLeftText className='icon'/>}/>
                          {isMobile ? '' : ' Message'}
                        </button>

                        <button className='btn white' onClick={() => handleViewProfile(member._id)} title={`View ${member.first_name}'s profile`}>
                          <IconContainer icon={<IoPersonCircleOutline className='icon xl'/>}/>
                          {isMobile ? '' : ' View profile'}
                        </button>

                        {currentProject?.members?.some(m => m._id === member._id)
                          && isAdmin
                          &&  <button className='btn white' title={`Remove ${member.first_name} from project`} onClick={() => handleRemoveMemberFromProject(member._id)}>
                                <IconContainer icon={<AiOutlineMinus className='icon'/>}/>{isMobile ? '' : ' Remove from project'}
                              </button>
                        }

                        {!currentProject?.members?.some(m => m._id === member._id)
                          && isAdmin
                          &&  <button className='btn white' title={`Add ${member.first_name} to project`} onClick={() => handleAddMember(member)}>
                                <IconContainer icon={<BsPlus className='icon xl'/>}/>{isMobile? '' : ' Add to project'}
                              </button>
                        }
                      </div>
                    </div>
                  )
                })
              }
              
            </div>

        </div>
      </>
  )
}

export default Users;