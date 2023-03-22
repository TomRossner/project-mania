import React from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from './common/ButtonSpinner';

const Profile = () => {
  const {userInfo} = useAuth();

  return (
    <>
      <div className='profile-container'>
        {userInfo ?
        <>
          <div className='profile-img-container'>
            <img src={userInfo?.imgUrl.toString()} alt="profile"/>
          </div>
          <h1>{userInfo.first_name} {userInfo.last_name}</h1>
        </>
        : <Spinner/>}
      </div>
    </>
  )
}

export default Profile;