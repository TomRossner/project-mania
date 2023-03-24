import React from 'react';
import BlankProfile from "../../assets/blank-profile-picture.png";

const BlankProfilePicture = () => {
  return (
    <div className='profile-img-container blank'>
        <img id='blank-profile' src={BlankProfile} alt='blank profile'/>
    </div>
  )
}

export default BlankProfilePicture;