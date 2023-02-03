import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import Create from './Create';
import { useNavigate } from 'react-router-dom';


const ProjectManagement = () => {
  const {open, currentProject} = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/projects/${currentProject._id}`);
  }

  useEffect(() => {
    if (currentProject) handleNavigate();
  }, [])

  return (
    <>
      <Create/>
    </>
  )
}

export default ProjectManagement;