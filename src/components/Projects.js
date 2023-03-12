import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import useProject from '../hooks/useProject';

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {boards: projects} = useProject();
  

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      {projects?.length ?
      ( <div className='projects-list'>
          {projects.map(project => {
            return (
            <div key={project._id} className='project' onClick={() => handleClick(project)}>
              <p>{project.title}</p>
              <span>{new Date(project.due_date).toDateString()}</span>
            </div>)
          })}
        </div> ) : null}
    </div>
  )
}

export default Projects;