import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from './common/Spinner';
import { UserContext } from '../contexts/UserContext';


const ProjectManagement = () => {
  const {currentProject} = useContext(ProjectContext);
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const handleNavigate = () => {
    navigate(`/project-mania-frontend/projects/${currentProject._id}`);
  }

  useEffect(() => {
    if (user && currentProject) handleNavigate();
  }, [currentProject])

  useEffect(() => {
    if (!user) navigate("/project-mania-frontend/login");
  }, [user])

  return (
    <>
    {currentProject ? <Navigate to={`/project-mania-frontend/projects/${currentProject._id}`}/> : <Spinner/>}
    </>
  )
}

export default ProjectManagement;