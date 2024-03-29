import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BackButton from '../../common/BackButton';
import SearchBar from '../../common/SearchBar';
import { fetchMembersAsync } from '../../../store/members/members.actions';
import Line from '../../common/Line';
import useAuth from '../../../hooks/useAuth';
import UserTab from './UserTab';
import { generateKey } from '../../../utils/keyGenerator';
import useProject from '../../../hooks/useProject';
import { BsPlus, BsSearch} from "react-icons/bs";
import IconContainer from '../../common/IconContainer';
import { IoPersonCircleOutline } from 'react-icons/io5';
import useChat from '../../../hooks/useChat';
import { AiOutlineMinus } from 'react-icons/ai';
import useMembers from '../../../hooks/useMembers';
import useSocketEvents from '../../../hooks/useSocketEvents';
import { setTargetUser, setUserProfileOpen } from '../../../store/globalStates/globalStates.actions';

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
  const {fetchUserChats} = useChat();

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

  const handleViewProfile = (user) => {
    // Set targetUser
    dispatch(setTargetUser(user));

    // Open user profile
    dispatch(setUserProfileOpen(true));
  }

  // Check search input
  useEffect(() => {
    if (!inputValue.length || !inputValue) setSearchResults([]);
    checkSearchInput(inputValue);
  }, [inputValue]);

  // Fetch all users and all current user's chats
  useEffect(() => {
    dispatch(fetchMembersAsync());
    fetchUserChats();
  }, []);


  // Handle searchResults on Online event
  const handleOnline = (data) => {
    if (searchResults.length && searchResults.some(res => res._id === data.userId)) {
      setSearchResults([...searchResults.map(searchRes => {
        if (searchRes._id === data.userId) {
          return {...searchRes, online: true};
        } else return searchRes;
      })])
    }
  }

  // Handle searchResults on Offline event
  const handleOffline = (data) => {
    if (searchResults.length && searchResults.some(res => res._id === data.userId)) {
      setSearchResults([...searchResults.map(searchRes => {
        if (searchRes._id === data.userId) {
          return {...searchRes, online: false};
        } else return searchRes;
      })])
    }
  }
 
  // Listen to socket events
  useSocketEvents({
    events: {
      online: handleOnline,
      offline: handleOffline
    }
  });

  const userAdditionalContent = (member) => <>
    <div className='buttons-container'>

      <button className='btn white' onClick={() => handleViewProfile(member)} title={`View ${member.first_name}'s profile`}>
        <IconContainer icon={<IoPersonCircleOutline className='icon xl'/>}/>
        <span className='btn-text'>View profile</span>
      </button>

      {currentProject?.members?.some(m => m._id === member._id)
        && isAdmin
        &&  <button className='btn white' title={`Remove ${member.first_name} from project`} onClick={() => handleRemoveMemberFromProject(member._id)}>
              <IconContainer icon={<AiOutlineMinus className='icon'/>}/>
              <span className='btn-text'>Remove from project</span>
            </button>
      }

      {!currentProject?.members?.some(m => m._id === member._id)
        && isAdmin
        &&  <button className='btn white' title={`Add ${member.first_name} to project`} onClick={() => handleAddMember(member)}>
              <IconContainer icon={<BsPlus className='icon xl'/>}/>
              <span className='btn-text'>Add to project</span>
            </button>
      }

      </div>
  </>

  return (
      <>
        <div className='users-container'>

          <BackButton/>

          <div className='title'>
            <h1>Users</h1>
            <SearchBar
              value={inputValue}
              fn={handleInputChange}
              placeholderText={"Search users"}
              icon={<IconContainer icon={<BsSearch className='icon'/>}/>}
            />
          </div>

            <div className='results-container'>
              <p>{members?.filter(member => member._id !== user?._id).length} {members?.filter(member => member._id !== user?._id).length === 1 ? "user found": "users found"}</p>
              <Line/>
              <h3>Results <span>({searchResults.filter(user => user._id !== userInfo?._id).length})</span></h3>
              <div className='grid-container'>
                {searchResults.length
                  ? <>
                      {searchResults?.filter(member => member._id !== user?._id).map(member => {
                        return (
                          <>
                          <div key={generateKey()} className='search-result'>
                            <UserTab user={member} onClick={() => handleViewProfile(member)} additionalContent={userAdditionalContent(member)}/>
                          </div>
                          </>
                        )
                      })}
                    </>
                  : members?.filter(m => m._id !== user?._id).map(member => {
                      return (
                        <div key={generateKey()} className='search-result'>
                          <UserTab user={member} additionalContent={userAdditionalContent(member)}/>
                        </div>
                      )
                  })
                }
              </div>
              
            </div>

        </div>
      </>
  )
}

export default Users;