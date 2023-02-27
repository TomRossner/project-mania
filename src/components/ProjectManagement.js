import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';


const ProjectManagement = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <>
    {user ? <Navigate to="/projects"/> : <Navigate to="/login"/>}
    </>
  )
}

export default ProjectManagement;