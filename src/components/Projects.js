import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import useProject from '../hooks/useProject';
import Spinner from './common/Spinner';
import LabelsContainer from './common/LabelContainer';

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {boards: projects, isLoading, handleCreateBoard} = useProject();

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      {isLoading ? <Spinner width={'80px'}/>
      : <>
          {projects?.length ?
          ( <div className='projects-list'>
              {projects.map(project => {
                return (
                <div key={project._id} className='project' onClick={() => handleClick(project)}>
                  <p>{project.title}</p>
                  <LabelsContainer content={<p>{new Date(project.due_date).toDateString()}</p>} additionalClass={'no-hover'}/>
                </div>)
              })}
            </div> )
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