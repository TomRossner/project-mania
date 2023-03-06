import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { IoIosNotifications } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { selectProject, selectUserProjects } from '../store/project/project.selector';
import { setCreatePopupOpen, setNotificationTabOpen, setProjectMenuOpen, setProfileTabOpen, setBoards } from '../store/project/project.actions';
import IconContainer from './common/IconContainer';
import { selectCurrentUser } from '../store/user/user.selector';
import { getUserInfo } from '../httpRequests/auth';
import {BsChatLeftText, BsChevronDown, BsPersonCircle} from "react-icons/bs";
import {IoSettingsOutline} from "react-icons/io5";
import {AiOutlineProject} from "react-icons/ai";
import { getProjects } from '../httpRequests/projectsRequests';
import { setCurrentProject } from '../store/project/project.actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const {profileTabOpen, notificationTabOpen, projectMenuOpen, createPopupOpen} = useSelector(selectProject);
  const currentUser = useSelector(selectCurrentUser);
  const boards = useSelector(selectUserProjects);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));

  const handleToggleProjectsDropdown = () => {
    return setProjectsDropdownOpen(!projectsDropdownOpen);
  }

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

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  useEffect(() => {
    if (currentUser) {
      const getUser = async () => { 
          const {data: user} = await getUserInfo(currentUser._id); 
          setUserName(`${user.first_name} ${user.last_name}`);
      }
      getUser();
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser){}
  }, [currentUser])

  return (
    <nav>
        <Logo/>
        <ul className='flex1'>
            <div className='li-expand'>
              <li onClick={handleToggleProjectsDropdown}>
                <IconContainer icon={<AiOutlineProject className='icon'/>}/>
                  <Link className='link flex1'>Projects</Link>
                <IconContainer icon={<BsChevronDown className={`icon ${!projectsDropdownOpen ? 'reversed' : ''}`}/>}/>
              </li>
              <div className={`${projectsDropdownOpen ? "dropdown open" : "dropdown"}`}>
                {boards?.map(project => <p onClick={() => handleClick(project)} key={project._id}>{project.title}</p>)}
              </div>
            </div>
            <li><IconContainer icon={<BsChatLeftText className='icon small'/>}/><Link className='link'>Messages</Link></li>
            <li><IconContainer icon={<IoSettingsOutline className="icon"/>}/><Link className='link'>Settings</Link></li>
        </ul>
        <ul id='left-nav-bottom-ul'>
          <div className='li-expand'>
            <div className="dropdown open">
              <Link className="link" to="/login">Login</Link>
              <Link className="link" to="/register">Register</Link>
              <div className='flex1'></div>
            </div>
          </div>
          <div className='profile'>
              <IconContainer onClick={handleToggleProfileTab} icon={<BsPersonCircle className='icon profile'/>}/>
              <span>{userName}</span>
          </div>
        </ul>
    </nav>
  )
}

export default NavBar;