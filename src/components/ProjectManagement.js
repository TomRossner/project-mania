import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import Create from './Create';
import { Navigate, useNavigate } from 'react-router-dom';
import StageOverview from './StageOverview';
import Spinner from './common/Spinner';


const ProjectManagement = () => {
  const {currentProject} = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/projects/${currentProject._id}`);
  }

  useEffect(() => {
    if (currentProject) handleNavigate();
  }, [currentProject])

  return (
    <>
    {currentProject ? <Navigate to={`/projects/${currentProject._id}`}/> : <Spinner/>}
    </>
  )
}

export default ProjectManagement;