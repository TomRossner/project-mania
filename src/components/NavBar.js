import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import IconContainer from './common/IconContainer';
import {BsChatLeftText, BsChevronDown} from "react-icons/bs";
import {IoSettingsOutline} from "react-icons/io5";
import {AiOutlineInfoCircle, AiOutlineProject} from "react-icons/ai";
import { setCurrentProject } from '../store/project/project.actions';
import useAuth from '../hooks/useAuth';
import {MdLogout, MdLogin, MdPerson} from "react-icons/md";
import {ImUserPlus} from "react-icons/im";
import {HiUserGroup} from "react-icons/hi";
import useProject from '../hooks/useProject';
import Space from "./common/Space";
import BlankProfilePicture from './common/BlankProfilePicture';
import { RxCross1, RxHome } from 'react-icons/rx';
import NavLink from './NavLink';
import { selectNavOpen } from '../store/globalStates/globalStates.selector';
import { setNavOpen } from '../store/globalStates/globalStates.actions';
import useMobile from '../hooks/useMobile';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {boards, closeMenu} = useProject();
  const {user, isAuthenticated, userInfo, profileImage, loadProfileImage} = useAuth();
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const {isMobile} = useMobile();
  const navOpen = useSelector(selectNavOpen);

  const handleToggleProjectsDropdown = () => {
    return setProjectsDropdownOpen(!projectsDropdownOpen);
  }

  const handleClick = (board) => {
    closeMenu();
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
    <>
    {isMobile ? (
      <>
        <nav className={navOpen ? 'mobile open' : 'mobile'}>
          <Logo/>
          <IconContainer additionalClass={'cross'} icon={<RxCross1 className='icon xl'/>} onClick={closeMenu}/>
          <ul className='flex1'>
              <NavLink path={'/'} icon={<RxHome className='icon'/>} text={'Home'} onClick={closeMenu}/>
              <div className='li-expand'>
                <li onClick={handleToggleProjectsDropdown}>
                  <IconContainer icon={<AiOutlineProject className='icon'/>}/>
                    <Link className='link flex1'>Projects</Link>
                  <IconContainer icon={<BsChevronDown className={`icon ${!projectsDropdownOpen ? 'reversed' : ''}`}/>} onClick={closeMenu}/>
                </li>
                {user && isAuthenticated && boards.length ?
                <>
                <div className={`${projectsDropdownOpen ? "dropdown open" : "dropdown"}`}>
                  {boards?.map(project => <p key={project._id} onClick={() => handleClick(project)}>{project.title}</p>)}
                </div>
                </> : null}
              </div>
              <NavLink path={'/users'} icon={<HiUserGroup className='icon'/>} text={'Browse users'} onClick={closeMenu}/>
              <NavLink path={`/chat/${user?._id}`} icon={<BsChatLeftText className='icon'/>} text={'Chat'} onClick={closeMenu}/>
              <NavLink path={'/about'} icon={<AiOutlineInfoCircle className='icon'/>} text={'About'} onClick={closeMenu}/>
              <NavLink path={'/settings'} icon={<IoSettingsOutline className='icon'/>} text={'Settings'} onClick={closeMenu}/>
          </ul>
          <ul id='left-nav-bottom-ul'>
            <div className='li-expand'>
              <div className="dropdown open">
                {
                  !user || !isAuthenticated ?
                  <>
                    <Link className="link flex-align" to="/sign-in" onClick={closeMenu}><IconContainer icon={<MdLogin className="icon"/>}/>Login</Link>
                    <Link className="link flex-align" to="/sign-up" onClick={closeMenu}><IconContainer icon={<ImUserPlus className="icon"/>}/>Sign up</Link>
                  </>
                  :
                  <>
                    <Link className="link flex-align" to="/profile" onClick={closeMenu}><IconContainer icon={<MdPerson className="icon large"/>}/>My profile</Link>
                    <Link className="link flex-align" to="/logout" onClick={closeMenu}><IconContainer icon={<MdLogout className="icon"/>}/>Logout</Link>
                  </>
                }
                <Space/>
              </div>
            </div>
            {user && isAuthenticated && (
              <div className='profile'>
                {profileImage
                ? <div className='profile-img-container'><img src={profileImage} alt="profile"/></div>
                : <BlankProfilePicture/>}
                <span>{userName}</span>
              </div>
            )}
          </ul>
        </nav>
      </>
    ) : (
      <nav>
        <Logo/>
        <ul className='flex1'>
            <NavLink path={'/'} icon={<RxHome className='icon'/>} text={'Home'}/>
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
            <NavLink path={'/users'} icon={<HiUserGroup className='icon'/>} text={'Browse users'}/>
            <NavLink path={`/chat/${user?._id}`} icon={<BsChatLeftText className='icon'/>} text={'Chat'}/>
            <NavLink path={'/about'} icon={<AiOutlineInfoCircle className='icon'/>} text={'About'}/>
            <NavLink path={'/settings'} icon={<IoSettingsOutline className='icon'/>} text={'Settings'}/>
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
                  <Link className="link flex-align" to="/profile"><IconContainer icon={<MdPerson className="icon large"/>}/>My profile</Link>
                  <Link className="link flex-align" to="/logout"><IconContainer icon={<MdLogout className="icon"/>}/>Logout</Link>
                </>
              }
              <Space/>
            </div>
          </div>
          {user && isAuthenticated && (
            <div className='profile'>
              {profileImage
              ? <div className='profile-img-container'><img src={profileImage} alt="profile"/></div>
              : <BlankProfilePicture/>}
              <span>{userName}</span>
            </div>
          )}
        </ul>
      </nav>
    )
  }
    </>
    
  )
}

export default NavBar;