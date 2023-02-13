import React from 'react';
import { SiGoogletagmanager } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate("/");

  return (
    <div className='logo-container' onClick={handleLogoClick}>
        <span className='icon-span'><SiGoogletagmanager className='icon logo'/></span>
    </div>
  )
}

export default Logo;