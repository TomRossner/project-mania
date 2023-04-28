import React from 'react';

const ProfilePicture = ({src, size}) => {
  return (
    <div className='profile-img-container'>
        <img
          src={src}
          alt="profile"
          width={size ? size : null}
          height={size ? size : null}
        />
    </div>
  )
}

export default ProfilePicture;