import React from 'react';

const PriorityLabel = ({priority, fn}) => {
    const {name, color_class} = priority;
    
  return (
      <span className={`label ${color_class}`} onClick={fn} title={name + " priority"}>{name}</span>
  )
}

export default PriorityLabel;