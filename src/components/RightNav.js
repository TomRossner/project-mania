import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { getUserInfo } from '../httpRequests/auth';
import { selectCurrentProject } from '../store/project/project.selector';
import { BsPersonCircle } from 'react-icons/bs';
import IconContainer from './common/IconContainer';

const RightNav = () => {
    const currentUser = useSelector(selectCurrentUser);
    const currentProject = useSelector(selectCurrentProject);
    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
          const getUser = () => {
            return async () => {
              const {data: user} = await getUserInfo(currentUser._id); 
              setUserName(`${user.first_name} ${user.last_name}`);
            }
          }
          dispatch(getUser());
        }
      }, [currentUser])

  return (
    <nav id="right-nav">
        <div className="right-nav-content">

        <div className="project-content">
            <div className="current-project-info">
            <h3>{currentProject.title}</h3>
            <p>{currentProject.subtitle}</p>
            </div>

            <div className="current-project-admins">
            <span>BOARD ADMINS</span>
            <div className="admins">
                <div className="admin">
                <IconContainer icon={<BsPersonCircle className='icon profile'/>}/>
                <span>{userName}</span>
                </div>
            </div>
            </div>
        </div>

        <div className="activity">
            <h3>Recent Activity</h3>
        </div>

        </div>
    </nav>
  )
}

export default RightNav