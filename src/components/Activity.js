import React from 'react';
import BlankProfilePicture from './common/BlankProfilePicture';
import useProject from '../hooks/useProject';
import { format_AM_PM, format_date } from '../utils/timeFormats';
import { generateKey } from '../utils/keyGenerator';

const Activity = () => {
  const {currentProject} = useProject();

  return (
    <div className="activity-container">
        <h3>Recent Activity</h3>
        <div className='timeline'>
            <div className='dashed-line'></div>
            <div className='activities'>
              {currentProject?.activity?.map(act => {
                return (
                  <div key={generateKey()} className='activity'>
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