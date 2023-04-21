import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useDispatch } from 'react-redux';
import IconContainer from './common/IconContainer';
import {BsChatLeftText, BsChevronDown} from "react-icons/bs";
import {IoSettingsOutline} from "react-icons/io5";
import {AiOutlineProject} from "react-icons/ai";
import { setCurrentProject } from '../store/project/project.actions';
import useAuth from '../hooks/useAuth';
import {MdLogout, MdLogin, MdPerson} from "react-icons/md";
import {ImUserPlus} from "react-icons/im";
import {HiUserGroup} from "react-icons/hi";
import useProject from '../hooks/useProject';
import Space from "./common/Space";
import BlankProfilePicture from './common/BlankProfilePicture';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {boards} = useProject();
  const {user, isAuthenticated, userInfo, profileImage, loadProfileImage} = useAuth();
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const handleToggleProjectsDropdown = () => {
    return setProjectsDropdownOpen(!projectsDropdownOpen);
  }  

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  useEffect(() => {
    if (userInfo) {
        setUserName(`${userInfo.first_name} ${userInfo.last_name}` || userInfo.name);
    } else setUserName("");
  }, [userInfo]);

  // Update profile image
  useEffect(() => {
    if (!userInfo) return;

    loadProfileImage();

  }, [userInfo]);

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
                {boards?.map(project => <p key={project._id} onClick={() => handleClick(project)}>{project.title}</p>)}
              </div>
              </> : null}
            </div>
            <li><IconContainer icon={<HiUserGroup className='icon'/>}/><Link className='link' to="/users">Browse users</Link></li>
            <li><IconContainer icon={<BsChatLeftText className='icon small'/>}/><Link className='link' to={`/chat/${user?._id}`}>Messages</Link></li>
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
                </>
                :
                <>
                  <Link className="link flex-align" to="/profile"><IconContainer icon={<MdPerson className="icon large"/>}/>My Profile</Link>
                  <Link className="link flex-align" to="/logout"><IconContainer icon={<MdLogout className="icon"/>}/>Logout</Link>
                </>
              }
              <Space/>
            </div>
          </div>
          <div className='profile'>
              {profileImage
              ? <div className='profile-img-container'><img src={profileImage} alt="profile"/></div>
              : <BlankProfilePicture/>}
              <span>{userName}</span>
          </div>
        </ul>
    </nav>
  )
}

export default NavBar;