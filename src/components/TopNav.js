import React from 'react';
import SearchBar from './common/SearchBar';
import IconContainer from './common/IconContainer';
import { BsPlus, BsBell } from 'react-icons/bs';
import Space from './common/Space';

const TopNav = ({fn, fn2}) => {
  return (
    <div className="top-nav">
        <SearchBar/>
        <Space/>
        <button className="btn blue" onClick={fn}><IconContainer icon={<BsPlus className='icon'/>}/>Create New Board</button>
        <button className="btn white"onClick={fn2}><IconContainer icon={<BsBell className='icon'/>}/></button>
    </div>
  )
}

export default TopNav;