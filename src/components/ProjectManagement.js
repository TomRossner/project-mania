import React from 'react';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


const ProjectManagement = () => {
  const {currentProject} = useContext(ProjectContext);
  const {user} = useContext(UserContext);

  return (
    <>
    {user && currentProject ? <Navigate to={`/project-mania-frontend/projects/${currentProject._id}`}/> : <Navigate to="/project-mania-frontend/login"/>}
    </>
  )
}

export default ProjectManagement;