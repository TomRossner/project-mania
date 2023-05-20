import React, { useEffect } from 'react';
import StageOverview from './StageOverview';
import useProject from '../../hooks/useProject';

const ProjectStagesContainer = () => {
  const {tasks, currentProject, handleCreate, refreshTasks} = useProject();

  useEffect(() => {
    if (!currentProject) return;

    // Refresh tasks
    refreshTasks();
    
  }, [currentProject]);

  return (
    <>
    {currentProject?.stages.length ?
      <div className='current-board-stages-container'>
          {currentProject?.stages.map((stage) => {
              return (<StageOverview key={stage._id} stage={stage}/>)})}
      </div> :
      <div className='create-to-get-started'>
        <h3>Create a stage to get started</h3>
        <button className='btn blue' onClick={() => handleCreate("stage")}>Create a stage</button>
      </div>
    }
    {currentProject?.stages.length && tasks?.length ? null :
      <div className='create-to-get-started'>
        <h3>Create a task to get started</h3>
        <button className='btn blue' onClick={() => handleCreate("task")}>Create a task</button>
      </div>
    }
    </>
  )
}

export default ProjectStagesContainer;