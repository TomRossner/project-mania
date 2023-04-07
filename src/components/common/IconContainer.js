import React from 'react';

const IconContainer = ({icon, onClick: functionToRun, additionalClass, title, id}) => {
    
    const handleClick = () => {
      if (functionToRun) functionToRun();
      else return;
    }

  return (
    <span
      className={`${additionalClass ? `icon-span ${additionalClass}` : `icon-span`}`}
      onClick={handleClick}
      title={title ? title : null}
      id={id ? id : null}
    >
      {icon}
    </span>
  )
}

export default IconContainer;