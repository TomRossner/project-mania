import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import { selectProject } from '../store/project/project.selector';
import { setCreatePopupOpen } from '../store/project/project.actions';
import { selectBoards } from '../store/boards/boards.selector';

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector(selectBoards);
  const {createPopupOpen} = useSelector(selectProject);
  

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  useEffect(() => {
    if (createPopupOpen) dispatch(setCreatePopupOpen(false));
  }, [])

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