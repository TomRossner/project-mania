import React from 'react';
import BlankProfile from "../../assets/blank-profile-picture.png";

const BlankProfilePicture = ({size}) => {
  return (
    <div className='profile-img-container blank'>
        <img
          id='blank-profile'
          src={BlankProfile}
          alt='blank profile'
          width={size ? size : null}
          height={size ? size : null}
        />
    </div>
  )
}

export default BlankProfilePicture;