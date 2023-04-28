import React from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";

const ThreeDotsMenu = ({fn}) => {
  return (
    <span className='icon-span dots-menu' onClick={fn}>
      <BsThreeDotsVertical className='icon'/>
    </span>
  )
}

export default ThreeDotsMenu;