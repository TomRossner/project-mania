import React, { Suspense, lazy, useEffect } from 'react';
import Activity from './Activity';
import useProject from '../hooks/useProject';
import { useDispatch, useSelector } from 'react-redux';
import { setActivity } from '../store/project/project.actions';
import { selectActivitySectionOpen } from '../store/globalStates/globalStates.selector';
import IconContainer from './common/IconContainer';
import { setActivitySectionOpen } from '../store/globalStates/globalStates.actions';
import { BsChevronLeft } from 'react-icons/bs';
import useMobile from '../hooks/useMobile';
import Spinner from './common/Spinner';

// const Activity = lazy(() => import("./Activity"));
const ProjectAdmins = lazy(() => import("./ProjectAdmins"));

const ActivitySection = () => {
    const {currentProject} = useProject();
    const dispatch = useDispatch();
    const activitySectionOpen = useSelector(selectActivitySectionOpen);
    const {isMobile} = useMobile();

    const handleToggleActivitySection = () => {
      dispatch(setActivitySectionOpen(!activitySectionOpen));
    }

    useEffect(() => {

      // Set activity
      dispatch(setActivity(currentProject.activity));

    }, [currentProject]);

  return (
    <>
    {isMobile
      ? <>
          {currentProject && (
            <nav id="activity-section-mobile" className={activitySectionOpen ? 'open' : ''}>
                <IconContainer additionalClass={activitySectionOpen ? 'toggle-collapse rotate' : 'toggle-collapse'} icon={<BsChevronLeft className='icon'/>} onClick={handleToggleActivitySection}/>
                <div className="right-nav-content">

                <div className="project-content">
                    <div className="current-project-info">
                      <h3>{currentProject?.title}</h3>
                      <p>{currentProject?.subtitle}</p>
                    </div>
                    <Suspense fallback={<div><Spinner/><h3>Loading admins...</h3></div>}>
                      <ProjectAdmins/>
                    </Suspense>
                </div>

                <div className='activity-section'>
                  <Activity/>
                </div>

                </div>
              </nav>
            )}
        </>
      : <>
          {currentProject && (
          <nav id="right-nav" className={activitySectionOpen ? 'open' : ''}>
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
        )}
        </>
    }
    
    </>
  )
}

export default ActivitySection;