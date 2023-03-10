import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ProjectManagement = () => {
  const {user, isAuthenticated} = useAuth();

  return (
    <>
    {user && isAuthenticated ? <Navigate to="/projects"/> : <Navigate to="/sign-in"/>}
    </>
  )
}

export default ProjectManagement;