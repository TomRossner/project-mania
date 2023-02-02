import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { IoIosNotifications } from "react-icons/io";
import { BsCircleFill, BsPersonCircle } from "react-icons/bs";
import { ProjectContext } from '../contexts/ProjectContext';

const NavBar = () => {
  const {setOpen, open, setProfileTabOpen, profileTabOpen, setNotificationTabOpen, notificationTabOpen} = useContext(ProjectContext);

  const handleCreateClick = () => {
    
    setOpen(!open);
  }

  const handleToggleNotificationTab = () => {
    setNotificationTabOpen(!notificationTabOpen);
  }

  const handleToggleProfileTab = () => {
    setProfileTabOpen(!profileTabOpen);
  }

  return (
    <nav>
        <Logo/>
        <ul className='flex1'>
            <Link className='link' to="projects">Projects</Link>
            <Link className='link' to="/create" onClick={handleCreateClick}>Create</Link>
        </ul>
        <ul>
            <li onClick={handleToggleNotificationTab}><IoIosNotifications className='icon'/></li>
            <span className='icon-span' onClick={handleToggleProfileTab}><BsPersonCircle className='icon profile'/></span>
        </ul>
    </nav>
  )
}

export default NavBar;