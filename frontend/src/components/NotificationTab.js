import React from 'react';
import Line from './common/Line';

const NotificationTab = () => {
  return (
    <div className='notifs-tab'>
        <h3>Notifications</h3>
        <Line/>
        <div className='notifications-container'>
            <div className='notification marked'></div>
            <div className='notification marked'></div>
            <div className='notification'></div>
            <div className='notification'></div>
        </div>
    </div>
  )
}

export default NotificationTab;