import React from 'react';
import IconContainer from './common/IconContainer';
import ProfilePicture from './common/ProfilePicture';
import BlankProfilePicture from './common/BlankProfilePicture';

const UserProfile = ({user}) => {
    
  return (
    <div className='create-popup-container'>    
        <div className='user-profile-container'>
            {user.base64_img_data || user.img_url
                ? <ProfilePicture src={user.base64_img_data || user.img_url}/>
                : <BlankProfilePicture/>
            }
            <h3>{user.first_name} {user.last_name}</h3>

            {user.header ? <p>{user.header}</p> : null}

            <div className='buttons-container'>
                <button className='btn white'>Send message</button>
            </div>
        </div>
    </div>
  )
}

export default UserProfile;