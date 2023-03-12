import React from 'react';
import Line from './common/Line';
import Spinner from './common/Spinner';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectStagesContainer from './ProjectStagesContainer';
import useProject from '../hooks/useProject';

const ProjectOverview = () => {
    const {currentProject} = useProject();

  return (
    <>
        {currentProject ?
        <div className="project-overview">
            <ProjectInfoBar/>
            <Line/>
            <ProjectStagesContainer/>
        </div>
        : <Spinner/>}
    </>
  )
}

export default ProjectOverview;