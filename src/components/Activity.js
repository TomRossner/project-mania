import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import IconContainer from './common/IconContainer';

const Activity = () => {

  return (
    <div className="activity-container">
        <h3>Recent Activity</h3>
        <div className='timeline'>
            <div className='dashed-line'></div>
            <div className='activity'>
                <IconContainer icon={<BsPersonCircle className='icon'/>}/><p><span>Tom</span> created <span className='project-name'>ProjectMania</span></p>
            </div>
        </div>
    </div>
  )
}

export default Activity;