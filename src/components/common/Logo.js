import React from 'react';
import { useNavigate } from 'react-router-dom';
import {AiFillProject} from "react-icons/ai";
import IconContainer from './IconContainer';
import useProject from '../../hooks/useProject';

const Logo = () => {
  const {closeMenu} = useProject();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    closeMenu();
    navigate("/");
  }

  return (
    <div className='logo-container' onClick={handleLogoClick}>
        <IconContainer icon={<AiFillProject className='icon logo'/>}/>
        <p>ProjectMania</p>
    </div>
  )
}

export default Logo;