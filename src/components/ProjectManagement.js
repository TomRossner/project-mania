import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import Create from './Create';
import { useNavigate } from 'react-router-dom';
import StageOverview from './StageOverview';


const ProjectManagement = () => {
  const {currentProject} = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/projects/${currentProject._id}`);
  }

  useEffect(() => {
    if (currentProject) handleNavigate();
  }, [currentProject])

  return <Create/>; // load something instead of null if currentProject is not available
}

export default ProjectManagement;