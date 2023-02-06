import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

const Projects = () => {
  const {boards, setCurrentProject, createPopupOpen, setCreatePopupOpen, loadProjects} = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleClick = (board) => {
    setCurrentProject(board);
    navigate(`/projects/${board._id}`);
  }

  useEffect(() => {
    if (createPopupOpen) setCreatePopupOpen(false);
  }, [])

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      <div className='projects-list'>
        {boards?.map(board => {
          return <div key={board._id} className='project' onClick={() => handleClick(board)}>
            <p>{board.title}</p>
            <span>{board.due_date}</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default Projects;