import React from 'react';

const ButtonIcon = ({icon, title, func, text, styles}) => {
  return (
    <button title={title} onClick={func} className={styles}>
        {icon}
        {text ? text : null}
    </button>
  )
}

export default ButtonIcon;