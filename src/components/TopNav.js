import React, { useEffect, useState } from 'react';
import SearchBar from './common/SearchBar';
import IconContainer from './common/IconContainer';
import { BsPlus, BsBell } from 'react-icons/bs';
import Space from './common/Space';
import {BsFillCircleFill} from "react-icons/bs";
import Clock from './Clock';
import useAuth from '../hooks/useAuth';

const TopNav = ({handleCreateBoard, handleToggleNotificationTab}) => {
  const [notifications, setNotifications] = useState([]);
  const {userInfo} = useAuth();

  useEffect(() => {
    if (!userInfo) return;
    setNotifications(userInfo.notifications);
  }, [userInfo]);

  return (
    <div className="top-nav">
        <SearchBar/>
        <Space/>
        {/* <Clock/> */}
        <button className="btn blue" onClick={handleCreateBoard}><IconContainer icon={<BsPlus className='icon'/>}/>Create New Board</button>
        <button className="btn white" onClick={handleToggleNotificationTab}>
          <IconContainer icon={<BsBell className='icon large'/>}/>
          {notifications.length ? <IconContainer additionalClass={"absolute"} icon={<BsFillCircleFill className='icon'/>}/> : null}
        </button>
    </div>
  )
}

export default TopNav;