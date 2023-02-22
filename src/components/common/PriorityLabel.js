import React from 'react';

const PriorityLabel = ({priority, fn}) => {
    const {name, color_class} = priority;
    console.log(priority)
  return (
    <span className={`priority ${color_class}`} onClick={fn} title={name + " priority"}>{name}</span>
  )
}

export default PriorityLabel;