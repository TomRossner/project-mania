import React, { useState, useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
// import useProfileImage from '../hooks/useProfileImage';
import BlankProfilePicture from './common/BlankProfilePicture';
import IconContainer from './common/IconContainer';
import useProject from '../hooks/useProject';
import { format_AM_PM, format_date } from '../utils/timeFormats';

const Activity = () => {
  const {userInfo, profileImage} = useAuth();
  const {currentProject} = useProject();

  return (
    <div className="activity-container">
        <h3>Recent Activity</h3>
        <div className='timeline'>
            <div className='dashed-line'></div>
            <div className='activities'>
              {currentProject?.activity?.map(act => {
                return (
                <div key={act.created_at} className='activity'>
                  <div className='activity-text'>
                    {act.created_by.image
                    ? <div className='profile-img-container'><img src={Buffer.from(act.created_by.image) || act.created_by.image.toString()} alt="profile"/></div>
                    : <BlankProfilePicture/>}
                    <p><span>{act.created_by.user_name}</span> {act.text}</p>
                  </div>
                  <span className='activity-time'>{format_date(act.created_at)} - {format_AM_PM(act.created_at)}</span>
                </div>
                )
              })}
            </div>
        </div>
    </div>
  )
}

export default Activity;