import React from 'react';

const PriorityLabel = ({priority, fn}) => {
    const {name, color_class} = priority;
  return (
    <span className={`priority ${color_class}`} onClick={fn}>{name}</span>
  )
}

export default PriorityLabel;