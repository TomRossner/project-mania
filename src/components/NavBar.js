import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { IoIosNotifications } from "react-icons/io";
import { BsCircleFill, BsPersonCircle } from "react-icons/bs";
import { ProjectContext } from '../contexts/ProjectContext';

const NavBar = () => {
  const {
    setProfileTabOpen,
    profileTabOpen,
    setNotificationTabOpen,
    notificationTabOpen,
    createPopupOpen,
    setCreatePopupOpen,
    closeCreatePopup,
    projectMenuOpen, setProjectMenuOpen
  } = useContext(ProjectContext);

  const handleProjectsClick = () => {
    closeCreatePopup();
    if (notificationTabOpen) setNotificationTabOpen(false);
    if (profileTabOpen) setProfileTabOpen(false);
  }

  const handleCreateClick = () => {
    setCreatePopupOpen(!createPopupOpen);
    if (projectMenuOpen) setProjectMenuOpen(false);
    if (notificationTabOpen) setNotificationTabOpen(false);
    if (profileTabOpen) setProfileTabOpen(false);
  }

  const handleToggleNotificationTab = () => {
    setNotificationTabOpen(!notificationTabOpen);
    if (profileTabOpen) setProfileTabOpen(false);
  }

  const handleToggleProfileTab = () => {
    setProfileTabOpen(!profileTabOpen);
    if (notificationTabOpen) setNotificationTabOpen(false);
  }

  return (
    <nav>
        <Logo/>
        <ul className='flex1'>
            <Link className='link' to="/project-mania-frontend/projects" onClick={handleProjectsClick}>Projects</Link>
            <li className='link' onClick={handleCreateClick}>Create</li>
        </ul>
        <ul>
            <li onClick={handleToggleNotificationTab}><IoIosNotifications className='icon'/></li>
            <span className='icon-span' onClick={handleToggleProfileTab}><BsPersonCircle className='icon profile'/></span>
        </ul>
    </nav>
  )
}

export default NavBar;