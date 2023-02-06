import React from 'react';
import { BiChevronLeft } from "react-icons/bi";
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link to=".." className='back-button link'><BiChevronLeft className='icon'/>Back</Link>
  )
}

export default BackButton;