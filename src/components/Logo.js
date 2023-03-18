import React from 'react';
import { SiGoogletagmanager } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import {AiFillProject} from "react-icons/ai";
import IconContainer from './common/IconContainer';

const Logo = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate("/");

  return (
    <div className='logo-container' onClick={handleLogoClick}>
        <IconContainer icon={<AiFillProject className='icon logo'/>}/>
        <p>ProjectMania</p>
    </div>
  )
}

export default Logo;