import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotifications } from '../store/globalStates/globalStates.actions';
import useProject from '../hooks/useProject';

const Notifications = () => {
  const dispatch = useDispatch();
  const {currentProject} = useProject();

  useEffect(() => {
    if (!currentProject) return;

    // Set notifications
    dispatch(setNotifications([...currentProject.notifications]));
    
  }, [currentProject]);

  return (
    <div>Notifications</div>
  )
}

export default Notifications;