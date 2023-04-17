import React, { useEffect, useState } from 'react';
import { BsCircleFill, BsPersonCircle } from 'react-icons/bs';
import IconContainer from './common/IconContainer';
import useAuth from '../hooks/useAuth';
import Activity from './Activity';
import useProject from '../hooks/useProject';
import { getUserByEmail } from '../httpRequests/http.members';
import BlankProfilePicture from './common/BlankProfilePicture';
import ProfilePicture from './common/ProfilePicture';
import { useDispatch } from 'react-redux';
import { setActivity } from '../store/project/project.actions';

const ActivitySection = () => {
    const {user, userInfo} = useAuth();
    const {currentProject} = useProject();
    const [userName, setUserName] = useState("");
    const [adminEmails, setAdminEmails] = useState([]);
    const [admins, setAdmins] = useState([]);
    const dispatch = useDispatch();

    const onlineStatusIcon = (user) => {
      return <BsCircleFill className={user.online ? 'icon online-status green' : 'icon online-status grey'}/>
    }

    const checkProfileURL = (user) => {
      return user.base64_img_data ? Buffer.from(user.base64_img_data) : user.img_url.toString();
    }

    const getAdmins = async () => {
      for (let i = 0; i < adminEmails.length; i++) {
        const adminObj = await getUserByEmail(adminEmails[i]);

        if (admins.find(adm => adm.email === adminObj.email)) return; // Don't add the same admin twice

        setAdmins([...admins, adminObj]);
      }
    }

    useEffect(() => {
        if (userInfo) {
          setUserName(`${userInfo.first_name} ${userInfo.last_name}`);
        } else return setUserName("");
      }, [userInfo])

      useEffect(() => {
        if (!currentProject || !adminEmails.length) return;
        getAdmins();
      }, [currentProject, adminEmails])

      useEffect(() => {
        if (!currentProject && (adminEmails.length || admins.length)) {
          setAdminEmails([]);
          setAdmins([]);
          return;
        }

        // Set admins
        if (currentProject?.admins.length) setAdminEmails(currentProject.admins);

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

          {admins?.length ? <div className="current-project-admins">
            <span>BOARD ADMINS</span>
            <div className="admins">
              {admins.map(admin => {
                if (admin.email === user?.email) {
                  return (
                    <div className="admin" key={admin.email}>
                      {admin.img_url || admin.base64_img_data
                      ? <>
                          <ProfilePicture src={checkProfileURL(userInfo)}/>
                          <IconContainer title={userInfo.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(userInfo)}/>
                        </>
                      : <IconContainer icon={<BsPersonCircle className='icon profile'/>}/>}
                      <span>{userName} (You)</span>
                    </div>)
                } else return (
                    <div className="admin" key={admin.email}>
                      {admin.img_url || admin.base64_img_data
                      ? <>
                          <ProfilePicture src={checkProfileURL(admin)}/>
                          <IconContainer title={admin.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(admin)}/>
                        </>
                      : <>
                          <BlankProfilePicture/>
                          <IconContainer title={admin.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(admin)}/>
                        </>}
                      <span>{admin.first_name} {admin.last_name}</span>
                    </div>
                  )
              })}
            </div>
          </div> : null}
      </div>

      <div className='activity-section'>
        <Activity/>
      </div>

      </div>
    </nav>
  )
}

export default ActivitySection;