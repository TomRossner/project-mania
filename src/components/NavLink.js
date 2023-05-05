import React from 'react';
import IconContainer from './common/IconContainer';
import { Link } from 'react-router-dom';

const NavLink = ({icon, path, text}) => {
  return (
    <li>
        <IconContainer icon={icon}/>
        <Link className='link' to={path}>{text}</Link>
    </li>
  )
}

export default NavLink;