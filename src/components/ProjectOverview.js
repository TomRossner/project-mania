import React from 'react';
import Line from './common/Line';
import DashboardTop from './DashboardTop';
import ProjectStagesContainer from './ProjectStagesContainer';
import useProject from '../hooks/useProject';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProjectOverview = () => {
    const {currentProject} = useProject();
    const {user, isAuthenticated} = useAuth();

  return (
    <>
        {currentProject
          ? <div className="project-overview">
                <DashboardTop/>
                <Line/>
                <ProjectStagesContainer/>
            </div>
          :   <>
                {user && isAuthenticated ? <Navigate to="/projects"/> : <Navigate to="/sign-in"/>}
              </>
        }
    </>
  )
}

export default ProjectOverview;