import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { IoIosNotifications } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { selectProject, selectUserProjects } from '../store/project/project.selector';
import { setCreatePopupOpen, setNotificationTabOpen, setProjectMenuOpen, setProfileTabOpen, setBoards } from '../store/project/project.actions';
import IconContainer from './common/IconContainer';
import { getUserInfo } from '../httpRequests/auth';
import {BsChatLeftText, BsChevronDown, BsPersonCircle} from "react-icons/bs";
import {IoSettingsOutline} from "react-icons/io5";
import {AiOutlineProject} from "react-icons/ai";
import { getProjects } from '../httpRequests/projectsRequests';
import { setCurrentProject } from '../store/project/project.actions';
import useAuth from '../hooks/useAuth';
import {selectBoards} from "../store/boards/boards.selector";
import {MdLogout, MdLogin} from "react-icons/md";
import {ImUserPlus} from "react-icons/im";
import {HiUserGroup} from "react-icons/hi";

const NavBar = () => {
  const dispatch = useDispatch();
  const {profileTabOpen, notificationTabOpen, projectMenuOpen, createPopupOpen} = useSelector(selectProject);
  const {user, isAuthenticated, userInfo} = useAuth();
  const boards = useSelector(selectBoards);
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
    if (userInfo) {
          setUserName(`${userInfo.first_name} ${userInfo.last_name}` || userInfo.name);
    } else setUserName("");
  }, [userInfo])

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
              {user && isAuthenticated && boards.length ?
              <>
              <div className={`${projectsDropdownOpen ? "dropdown open" : "dropdown"}`}>
                {boards?.map(project => <p onClick={() => handleClick(project)} key={project._id}>{project.title}</p>)}
              </div>
              </> : null}
            </div>
            <li><IconContainer icon={<HiUserGroup className='icon'/>}/><Link className='link' to="/users">Browse users</Link></li>
            <li><IconContainer icon={<BsChatLeftText className='icon small'/>}/><Link className='link'>Messages</Link></li>
            <li><IconContainer icon={<IoSettingsOutline className="icon"/>}/><Link className='link'>Settings</Link></li>
        </ul>
        <ul id='left-nav-bottom-ul'>
          <div className='li-expand'>
            <div className="dropdown open">
              {
                !user || !isAuthenticated ?
                <>
                  <Link className="link flex-align" to="/sign-in"><IconContainer icon={<MdLogin className="icon"/>}/>Login</Link>
                  <Link className="link flex-align" to="/sign-up"><IconContainer icon={<ImUserPlus className="icon"/>}/>Sign up</Link>
                </> :
                  <Link className="link flex-align" to="/logout"><IconContainer icon={<MdLogout className="icon"/>}/>Logout</Link>
              }
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