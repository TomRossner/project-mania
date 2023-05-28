import React from 'react';

const CancelButton = ({fn, text = 'Cancel'}) => {
  return (
    <button className='btn cancel' type="button" onClick={fn}>{text}</button>
  )
}

export default CancelButton;