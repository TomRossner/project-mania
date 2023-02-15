import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import StageOverview from './StageOverview';

const ProjectStagesContainer = () => {
    const {currentProject} = useContext(ProjectContext);
  return (
    <>
    <div className='current-board-stages-container'>
        {currentProject?.stages?.map((stage) => {
            return (<StageOverview key={stage._id} stage={stage}/>)})}
    </div>
    </>
  )
}

export default ProjectStagesContainer;