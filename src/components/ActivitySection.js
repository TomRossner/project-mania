import React, { useEffect } from 'react';
import Activity from './Activity';
import useProject from '../hooks/useProject';
import { useDispatch } from 'react-redux';
import { setActivity } from '../store/project/project.actions';
import ProjectAdmins from './ProjectAdmins';

const ActivitySection = () => {
    const {currentProject} = useProject();
    const dispatch = useDispatch();

    useEffect(() => {

      // Set activity
      dispatch(setActivity(currentProject.activity));

    }, [currentProject])

  return (
    <nav id="right-nav">
      <div className="right-nav-content">

      <div className="project-content">
          <div className="current-project-info">
            <h3>{currentProject?.title}</h3>
            <p>{currentProject?.subtitle}</p>
          </div>
          <ProjectAdmins/>
      </div>

      <div className='activity-section'>
        <Activity/>
      </div>

      </div>
    </nav>
  )
}

export default ActivitySection;