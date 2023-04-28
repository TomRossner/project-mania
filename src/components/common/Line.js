import React from 'react';

const Line = ({width}) => {
  return (
    <hr className={`line ${width ? width : null}`}/>
  )
}

export default Line;