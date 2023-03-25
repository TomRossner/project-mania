import React from 'react';

const IconContainer = ({icon, onClick: functionToRun, additionalClass, title}) => {
    
    const handleClick = () => {
      if (functionToRun) functionToRun();
      else return;
    }

  return (
    <span className={`${additionalClass ? `icon-span ${additionalClass}` : `icon-span`}`} onClick={handleClick} title={title ? title : null}>{icon}</span>
  )
}

export default IconContainer;