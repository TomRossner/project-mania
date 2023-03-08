import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ProjectManagement = () => {
  const {user} = useAuth();

  return (
    <>
    {user ? <Navigate to="/projects"/> : <Navigate to="/sign-in"/>}
    </>
  )
}

export default ProjectManagement;