import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';

const Projects = () => {
  const {boards, setCurrentProject} = useContext(ProjectContext);

  const handleClick = (board) => {
    return setCurrentProject(board);
  }

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      <div className='projects-list'>
        {boards?.map(board => {
          return <div key={board.id} className='project' onClick={() => handleClick(board)}>
            <p>{board.title}</p>
            <span>{board.due_date}</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default Projects;