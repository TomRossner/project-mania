import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import BlankProfilePicture from './common/BlankProfilePicture';
import IconContainer from './common/IconContainer';

const Activity = () => {
  const {userInfo} = useAuth();

  return (
    <div className="activity-container">
        <h3>Recent Activity</h3>
        <div className='timeline'>
            <div className='dashed-line'></div>
            <div className='activity'>
                {userInfo?.img_url || userInfo?.base64_img_data
                ? <div className='profile-img-container'>
                    <img src={userInfo.base64_img_data ? Buffer.from(userInfo.base64_img_data) : userInfo.img_url.toString()} alt="profile"/>
                  </div>
                : <BlankProfilePicture/>}<p><span>Tom</span> created <span className='project-name'>ProjectMania</span></p>
            </div>
        </div>
    </div>
  )
}

export default Activity;