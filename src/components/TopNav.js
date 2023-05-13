import React, { useState } from 'react';
import IconContainer from './common/IconContainer';
import { BsPlus, BsBell } from 'react-icons/bs';
import Space from './common/Space';
// import {BsFillCircleFill} from "react-icons/bs";
import useAuth from '../hooks/useAuth';
import MenuIcon from './MenuIcon';
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../store/globalStates/globalStates.selector';

const TopNav = ({handleCreateBoard, handleToggleNotificationTab}) => {
  // const [notifications, setNotifications] = useState([]);
  const {userInfo, isAuthenticated, user} = useAuth();
  // const {isMobile} = useMobile();
  const isMobile = useSelector(selectIsMobile);

  // useEffect(() => {
  //   if (!userInfo) return;
  //   setNotifications(userInfo.notifications);
  // }, [userInfo]);

  return (
    <div className="top-nav">
        {isMobile ? <MenuIcon/> : null}
        {user && isAuthenticated
          ? <h1>👋 Welcome back, {userInfo?.first_name}</h1>
          : <h1>Welcome to ProjectMania!</h1>
        }
        
        <Space/>
        {user && isAuthenticated
          ? <>
              <div className='buttons-container'>
                <button className="btn blue" onClick={handleCreateBoard}>
                  <IconContainer icon={<BsPlus className='icon'/>}/>
                  <span className='btn-text'>{isMobile ? 'New Board' : 'Create New Board'}</span>
                </button>
                {/* <button className="btn white" onClick={handleToggleNotificationTab}>
                  <IconContainer icon={<BsBell className='icon large'/>}/>
                  {notifications?.length ? <IconContainer additionalClass={"absolute"} icon={<BsFillCircleFill className='icon'/>}/> : null}
                </button> */}
              </div>
            </>
          : null
        }
    </div>
  )
}

export default TopNav;