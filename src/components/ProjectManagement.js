import React from 'react';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


const ProjectManagement = () => {
  const {user} = useContext(UserContext);

  return (
    <>
    {user && <Navigate to="/projects"/>}
    </>
  )
}

export default ProjectManagement;