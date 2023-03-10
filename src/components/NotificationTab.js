import React from 'react';
import Line from './common/Line';
import {VscTrash} from "react-icons/vsc";
import IconContainer from './common/IconContainer';

const NotificationTab = () => {
  return ( // Map through user's notifications
    <div className='notifs-tab'>
        <h3>Notifications</h3>
        <Line/>
        <div className='notifications-container'>
            <div className='notification marked'></div>
            <div className='notification marked'></div>
            <div className='notification'></div>
            <div className='notification'></div>
            <div className='notification'></div>
            <div className='notification'></div>
            <div className='notification'></div>
            <div className='notification'></div>
        </div>
        <div className='buttons-container'>
          <button className='btn white'>
            <IconContainer icon={<VscTrash className='icon'/>}/>
              Clear notifications
            </button>
        </div>
    </div>
  )
}

export default NotificationTab;