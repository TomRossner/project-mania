import React from 'react';

const ProfilePicture = ({src, size, title}) => {
  return (
    <div className='profile-img-container' title={title ? title : null}>
        <img
          src={src}
          alt="profile"
          width={size ? size : null}
          // height={size ? size : null}
        />
    </div>
  )
}

export default ProfilePicture;