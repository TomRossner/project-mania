import React from 'react';

const HeaderModal = ({closeHeaderModal}) => {
  return (
    <div className='header-modal'>
        <p>Enhance you profile</p>
        <button className='btn white' onClick={closeHeaderModal}>Add a header</button>
    </div>
  )
}

export default HeaderModal;