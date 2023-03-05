import React from 'react';

const CancelButton = ({fn}) => {
  return (
    <button className='btn cancel' type="button" onClick={fn}>Cancel</button>
  )
}

export default CancelButton;