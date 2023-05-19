import React from 'react';
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  
  return (
    <button type='button' className='back-button link' onClick={handleClick}><BiChevronLeft className='icon'/>Back</button>
  )
}

export default BackButton;