import React, { useState } from 'react';
import IconContainer from './common/IconContainer';
import { BsPlus, BsBell } from 'react-icons/bs';
import Space from './common/Space';
// import {BsFillCircleFill} from "react-icons/bs";
import useAuth from '../hooks/useAuth';
import MenuIcon from './MenuIcon';
import useMobile from '../hooks/useMobile';

const TopNav = ({handleCreateBoard, handleToggleNotificationTab}) => {
  // const [notifications, setNotifications] = useState([]);
  const {userInfo, isAuthenticated} = useAuth();
  const {isMobile} = useMobile();

  // useEffect(() => {
  //   if (!userInfo) return;
  //   setNotifications(userInfo.notifications);
  // }, [userInfo]);

  return (
    <div className="top-nav">
        {isMobile ? <MenuIcon/> : null}
        {userInfo && isAuthenticated
          ? <h1>👋 Welcome back, {userInfo.first_name}</h1>
          : null
        }
        
        <Space/>
        <div className='buttons-container'>
          <button className="btn blue" onClick={handleCreateBoard}><IconContainer icon={<BsPlus className='icon'/>}/>{isMobile ? 'New Board' : 'Create New Board'}</button>
          {/* <button className="btn white" onClick={handleToggleNotificationTab}>
            <IconContainer icon={<BsBell className='icon large'/>}/>
            {notifications?.length ? <IconContainer additionalClass={"absolute"} icon={<BsFillCircleFill className='icon'/>}/> : null}
          </button> */}
        </div>
    </div>
  )
}

export default TopNav;