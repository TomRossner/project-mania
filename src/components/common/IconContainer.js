import React from 'react';

const IconContainer = ({icon, onClick: functionToRun, additionalClass}) => {
    
    const handleClick = () => {
      if (functionToRun) functionToRun();
      else return;
    }

  return (
    <span className={`${additionalClass ? `icon-span ${additionalClass}` : `icon-span`}`} onClick={handleClick}>{icon}</span>
  )
}

export default IconContainer;