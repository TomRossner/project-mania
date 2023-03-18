import React from 'react';
import Line from './common/Line';
import {VscTrash} from "react-icons/vsc";
import IconContainer from './common/IconContainer';
import useProject from '../hooks/useProject';

const NotificationTab = () => {
  const {notifications} = useProject();
  return ( // Map through user's notifications
    <div className='notifs-tab'>
        <h3>Notifications</h3>
        <Line/>
        <div className='notifications-container'>
          {notifications.length ? notifications.map(n => {
            return <div key={n._id} className='notification'>{n.message}</div>
          }) : null}
            <div className='notification marked'></div>
            <div className='notification marked'></div>
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