import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import Create from './Create';
import ProjectOverview from './ProjectOverview';
import { useNavigate } from 'react-router-dom';


const ProjectManagement = () => {
  const {open, currentProject} = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/projects/${currentProject._id}`);
  }

  return (
    <>
        {!currentProject ? <Create/> : handleNavigate}
    </>
  )
}

export default ProjectManagement;