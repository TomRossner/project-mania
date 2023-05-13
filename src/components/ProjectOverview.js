import React, { useEffect } from 'react';
import Line from './common/Line';
import DashboardTop from './DashboardTop';
import ProjectStagesContainer from './ProjectStagesContainer';
import useProject from '../hooks/useProject';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAdmin } from '../store/userInfo/userInfo.actions';

const ProjectOverview = () => {
    const {currentProject} = useProject();
    const {user, isAuthenticated} = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
      const checkIfAdmin = () => {
        // Set admin property to true if the user's email is in admins list
        if (currentProject?.admins.includes(user?.email)) {
            dispatch(setIsAdmin(true));
            return;
        } else {
            // Set admin property to false if true and user is not in admins list
            if (!currentProject?.admins.includes(user?.email)) {
                dispatch(setIsAdmin(false));
                return;
            }
        }
      }


      checkIfAdmin();
    }, [currentProject]);

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