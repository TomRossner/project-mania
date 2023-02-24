import React from 'react';
import PriorityLabel from "./PriorityLabel";

const LabelsContainer = ({priority}) => {
  return (
    <div className='labels-container'>
        <PriorityLabel priority={priority}/>
    </div>
  )
}

export default LabelsContainer;