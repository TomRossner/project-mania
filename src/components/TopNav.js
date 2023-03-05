import React from 'react';
import SearchBar from './common/SearchBar';
import IconContainer from './common/IconContainer';
import { BsPlus, BsBell } from 'react-icons/bs';

const TopNav = ({fn}) => {
  return (
    <div className="top-nav">
        <SearchBar/>
        <div className="flex1"></div>
        <button className="btn blue" onClick={fn}><IconContainer icon={<BsPlus className='icon'/>}/>Create New Board</button>
        <button className="btn white"><IconContainer icon={<BsBell className='icon'/>}/></button>
    </div>
  )
}

export default TopNav;