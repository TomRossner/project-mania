import React from 'react';
import Line from './common/Line';
import Spinner from './common/Spinner';
import DashboardTop from './DashboardTop';
import ProjectStagesContainer from './ProjectStagesContainer';
import useProject from '../hooks/useProject';

const ProjectOverview = () => {
    const {currentProject} = useProject();

  return (
    <>
        {currentProject
        ? <div className="project-overview">
              <DashboardTop/>
              <Line/>
              <ProjectStagesContainer/>
          </div>
        : <Spinner/>} {/* Replace spinner */}
    </>
  )
}

export default ProjectOverview;