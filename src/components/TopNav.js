import React, { useState } from 'react';
import SearchBar from './common/SearchBar';
import IconContainer from './common/IconContainer';
import { BsPlus, BsBell } from 'react-icons/bs';
import Space from './common/Space';
import {BsFillCircleFill} from "react-icons/bs";
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';

const TopNav = ({fn, fn2}) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="top-nav">
        <SearchBar/>
        <Space/>
        <button className="btn blue" onClick={fn}><IconContainer icon={<BsPlus className='icon'/>}/>Create New Board</button>
        <button className="btn white"onClick={fn2}>
          <IconContainer icon={<BsBell className='icon large'/>}/>
          {!notifications.length ? <IconContainer additionalClass={"absolute"} icon={<BsFillCircleFill className='icon'/>}/> : null}
        </button>
    </div>
  )
}

export default TopNav;