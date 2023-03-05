import React from 'react';
import PriorityLabel from "./PriorityLabel";

const LabelsContainer = ({priority, additionalClass, fn, content}) => {
  return (

    <>
    {content
    ?
    <div onClick={fn} className={additionalClass ? `label-container ${additionalClass}` : `label-container`}>
      {content}
    </div>
    :
    <div onClick={fn} className={additionalClass ? `label-container ${priority.color_class}-bg ${additionalClass}` : `label-container ${priority.color_class}-bg`}>
        <PriorityLabel priority={priority}/>
    </div>}
    </>
  )
}

export default LabelsContainer;