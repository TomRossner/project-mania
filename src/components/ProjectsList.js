import React from 'react';
import useProject from '../hooks/useProject';
import Spinner from './common/Spinner';
import ListedProject from './ListedProject';

const Projects = () => {
  const {
    boards: projects,
    isLoading,
    handleCreateBoard,
  } = useProject();

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      {isLoading
        ? <Spinner width={'80px'}/>
        : <>
            {projects?.length ?
              <div className='projects-list'>
                {projects.map(project => {
                  return (
                    <ListedProject key={project._id} project={project}/>
                  )
                })}
              </div>
              : <div id='no-projects'>
                  <p>No projects found</p>
                  <button className='btn blue' onClick={handleCreateBoard}>Create a project</button>
                </div>
              }
          </>
      }
    </div>
  )
}

export default Projects;