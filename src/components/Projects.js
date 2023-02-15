import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import Spinner from './common/Spinner';

const Projects = () => {
  const {boards, setCurrentProject, createPopupOpen, setCreatePopupOpen, loadProjects} = useContext(ProjectContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const handleClick = (board) => {
    setCurrentProject(board);
    navigate(`/project-mania-frontend/projects/${board._id}`);
  }


  useEffect(() => {
    if (createPopupOpen) setCreatePopupOpen(false);
    const fetchProjects = async () => {
      const response = await loadProjects();
      setProjects(response);
    }
    fetchProjects();
  }, [])

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      {projects?.length ?
      ( <div className='projects-list'>
          {projects.map(project => {
            return <div key={project._id} className='project' onClick={() => handleClick(project)}>
              <p>{project.title}</p>
              <span>{new Date(project.due_date).toDateString()}</span>
            </div>
          })}
        </div> ) : <Spinner/>}
    </div>
  )
}

export default Projects;