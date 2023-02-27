import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';
import StageOverview from './StageOverview';

const ProjectStagesContainer = () => {
    const currentProject = useSelector(selectCurrentProject);
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