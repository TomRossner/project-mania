import React from 'react';

const ProfilePicture = ({src}) => {
  return (
    <div className='profile-img-container'>
        <img src={src} alt="profile"/>
    </div>
  )
}

export default ProfilePicture;