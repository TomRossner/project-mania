import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../httpRequests/http.auth';
import { BsPersonCircle } from 'react-icons/bs';
import IconContainer from './common/IconContainer';
import useAuth from '../hooks/useAuth';
import Activity from './Activity';
import useProject from '../hooks/useProject';
import { getUserByEmail } from '../httpRequests/http.members';

const RightNav = () => {
    const {user} = useAuth();
    const {currentProject} = useProject();
    const [userName, setUserName] = useState("");
    const adminEmails = currentProject?.admins;
    const [admins, setAdmins] = useState([]);

    const getAdmins = async () => {
      for (let i = 0; i < adminEmails.length; i++) {
        const adminObj = await getUserByEmail(adminEmails[i]);
        if (admins.find(adm => adm.email === adminObj.email)) return; // Don't add the same admin twice
        setAdmins([...admins, adminObj]);
      }
    }

    useEffect(() => {
        if (user) {
          const getUser = async () => {
            const {data} = await getUserInfo(user._id); 
            setUserName(`${data.first_name} ${data.last_name}`);
          }
          getUser();
        } else return setUserName("");
      }, [user])

      useEffect(() => {
        if (!currentProject) return;
        getAdmins();
      }, [currentProject])

  return (
    <nav id="right-nav">
        <div className="right-nav-content">

        <div className="project-content">
            <div className="current-project-info">
              <h3>{currentProject?.title}</h3>
              <p>{currentProject?.subtitle}</p>
            </div>

            {admins?.length ? <div className="current-project-admins">
              <span>BOARD ADMINS</span>
              <div className="admins">
                {admins.map(admin => {
                  if (admin.email === user?.email) {
                    return (
                      <div className="admin" key={admin.email}>
                        {admin.imgUrl
                        ? <div className='profile-img-container'><img src={admin.imgUrl.toString()} alt="profile"/></div>
                        : <IconContainer icon={<BsPersonCircle className='icon profile'/>}/>}
                        <span>{userName} (You)</span>
                      </div>)
                  } else return (
                      <div className="admin">
                        {admin.imgUrl
                        ? <div className='profile-img-container'><img src={admin.imgUrl.toString()} alt="profile"/></div>
                        : <IconContainer icon={<BsPersonCircle className='icon profile'/>}/>}
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