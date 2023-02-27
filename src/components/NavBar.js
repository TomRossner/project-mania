import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { IoIosNotifications } from "react-icons/io";
import { BsCircleFill, BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../store/project/project.selector';
import { setCreatePopupOpen, setNotificationTabOpen, setProjectMenuOpen, setProfileTabOpen } from '../store/project/project.actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const {profileTabOpen, notificationTabOpen, projectMenuOpen, createPopupOpen} = useSelector(selectProject);

  const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));

  const handleProjectsClick = () => {
    closeCreatePopup();
    if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
    if (profileTabOpen) dispatch(setProfileTabOpen(false));
  }

  const handleCreateClick = () => {
    dispatch(setCreatePopupOpen(!createPopupOpen));
    if (projectMenuOpen) dispatch(setProjectMenuOpen(false));
    if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
    if (profileTabOpen) dispatch(setProfileTabOpen(false));
  }

  const handleToggleNotificationTab = () => {
    dispatch(setNotificationTabOpen(!notificationTabOpen));
    if (profileTabOpen) dispatch(setProfileTabOpen(false));
  }

  const handleToggleProfileTab = () => {
    dispatch(setProfileTabOpen(!profileTabOpen));
    if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
  }

  return (
    <nav>
        <Logo/>
        <ul className='flex1'>
            <Link className='link' to="/projects" onClick={handleProjectsClick}>Projects</Link>
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