import React from 'react';

const IconContainer = ({icon, onClick: functionToRun}) => {
    
    const handleClick = () => {
      if (functionToRun) functionToRun();
      else return;
    }

  return (
    <span className='icon-span' onClick={handleClick}>{icon}</span>
  )
}

export default IconContainer;