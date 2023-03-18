import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../httpRequests/http.auth';
import { BsPersonCircle } from 'react-icons/bs';
import IconContainer from './common/IconContainer';
import useAuth from '../hooks/useAuth';
import Activity from './Activity';
import useProject from '../hooks/useProject';

const RightNav = () => {
    const {user} = useAuth();
    const {currentProject} = useProject();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (user) {
          const getUser = async () => {
            const {data} = await getUserInfo(user._id); 
            setUserName(`${data.first_name} ${data.last_name}`);
          }
          getUser();
        } else return setUserName("");
      }, [user])

  return (
    <nav id="right-nav">
        <div className="right-nav-content">

        <div className="project-content">
            <div className="current-project-info">
              <h3>{currentProject?.title}</h3>
              <p>{currentProject?.subtitle}</p>
            </div>

            {currentProject?.admins?.length ? <div className="current-project-admins">
              <span>BOARD ADMINS</span>
              <div className="admins">
                {currentProject.admins.map(admin => {
                  if (admin._id === user?._id) {
                    return (
                      <div className="admin" key={admin._id}>
                        <IconContainer icon={<BsPersonCircle className='icon profile'/>}/>
                        <span>{userName} (You)</span>
                      </div>)
                  } else return (
                      <div className="admin">
                        <IconContainer icon={<BsPersonCircle className='icon profile'/>}/>
                        <span>{admin.first_name} {admin.last_name}</span>
                      </div>) 
                })}
              </div>
            </div> : null}
        </div>

        <Activity/>

        </div>
    </nav>
  )
}

export default RightNav;