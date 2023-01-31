import React from 'react';

const NotificationTab = () => {
  return (
    <div className='notifs-tab'>
        <h3>Notifications</h3>
        <hr className='line'/>
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