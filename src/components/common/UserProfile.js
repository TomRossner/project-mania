import React, { useEffect } from 'react';
import IconContainer from './IconContainer';
import ProfilePicture from './ProfilePicture';
import BlankProfilePicture from './BlankProfilePicture';
import useMembers from '../../hooks/useMembers';
import { RxCross1 } from 'react-icons/rx';
import useProject from '../../hooks/useProject';
import Space from './Space';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards } from '../../store/boards/boards.selector';
import LabelContainer from './LabelsContainer';
import { fetchChatAsync, setChatSideBarOpen, setCurrentContact } from '../../store/chat/chat.actions';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const {targetUser} = useMembers();
  const {handleCloseUserProfile} = useProject();
  const dispatch = useDispatch();
  const {userInfo} = useAuth();
  const navigate = useNavigate();

  const boards = useSelector(selectBoards);

  const commonProjectsCount = boards.reduce((count, board) => {
    const projectMemberCount = board.members.reduce((memberCount, member) => {
      if (member.email === targetUser.email) {
        return memberCount + 1;
      }
      return memberCount;
    }, 0);
  
    return count + (projectMemberCount > 0 ? 1 : 0);
  }, 0);

  // Load chat
  const loadChat = (userId, contactId) => {
    dispatch(fetchChatAsync(userId, contactId));
  }

  // Handle chat click
  const handleLoadChat = async (user) => {
    loadChat(userInfo?._id, user._id);
    dispatch(setCurrentContact(user));
    dispatch(setChatSideBarOpen(false));
    navigate(`/chat/${userInfo?._id}`);
    handleCloseUserProfile();
  }
    
  return (
    <div className='create-popup-container active'>    
        <div className='user-profile-container'>
          <IconContainer additionalClass={'cross'} icon={<RxCross1 className='icon'/>} onClick={handleCloseUserProfile}/>
            {targetUser.base64_img_data || targetUser.img_url
                ? <ProfilePicture src={targetUser.base64_img_data || targetUser.img_url}/>
                : <BlankProfilePicture/>
            }

            <LabelContainer additionalClass={`no-hover ${targetUser.online ? 'green green-bg no-hover' : 'red red-bg'}`} content={targetUser.online ? 'Online' : 'Offline'}/>

            <h3>{targetUser.first_name} {targetUser.last_name}</h3>

            {targetUser.header ? <p>{targetUser.header}</p> : null}

            <div className='buttons-container'>
                <button className='btn white' onClick={() => handleLoadChat(targetUser)}>Send message</button>
            </div>

            <Space/>

            <p id='commonProjects'>You have <span>{commonProjectsCount}</span> {commonProjectsCount === 1 ? 'project' : 'projects'} in common.</p>

            <p>Member since <span>{new Date(targetUser?.created_at).toLocaleDateString()}</span></p>
        </div>
    </div>
  )
}

export default UserProfile;