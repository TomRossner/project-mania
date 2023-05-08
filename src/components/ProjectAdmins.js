import React, { useEffect, useState } from 'react';
import ProfilePicture from './common/ProfilePicture';
import IconContainer from './common/IconContainer';
import BlankProfilePicture from './common/BlankProfilePicture';
import useAuth from '../hooks/useAuth';
import useProject from '../hooks/useProject';
import { BsCircleFill } from 'react-icons/bs';
import { getUserByEmail } from '../httpRequests/http.members';
import { generateKey } from '../utils/keyGenerator';
import { socket } from '../utils/socket';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';

const ProjectAdmins = () => {
    const {userInfo, user, userName} = useAuth();
    const {currentProject, handleOpenAdminModal} = useProject();
    const [adminEmails, setAdminEmails] = useState([]);
    const [admins, setAdmins] = useState([]);
    const dispatch = useDispatch();

    socket.on('online', (data) => {
        if (admins.some(adm => adm._id === data.userId)) {
            setAdmins([...admins.map(adm => {
                if (adm._id === data.userId) {
                    return {...adm, online: true};
                } else return adm;
            })])
        }
    })
    
    socket.on('offline', (data) => {
        if (admins.some(adm => adm._id === data.userId)) {
            setAdmins([...admins.map(adm => {
                if (adm._id === data.userId) {
                    return {...adm, online: false};
                } else return adm;
            })])
        }
    })

    const onlineStatusIcon = (user) => {
        return <BsCircleFill className={user.online ? 'icon online-status green' : 'icon online-status grey'}/>
    }

    const checkProfileURL = (user) => {
        return user.base64_img_data ? Buffer.from(user.base64_img_data) : user.img_url.toString();
    }

    const getAdmins = async () => {
        const updatedAdmins = [];
        
        for (let i = 0; i < adminEmails.length; i++) {
            const adminObj = await getUserByEmail(adminEmails[i]);

            // Check if the admin is already in admins array
            const isAlreadyInAdminsArray = admins.some(adm => adm.email === adminObj.email);
            if (isAlreadyInAdminsArray) return;

            // Add admin to array
            updatedAdmins.push(adminObj);
        }

        // Update array
        setAdmins(updatedAdmins);
    }


    useEffect(() => {
        if (!currentProject || !adminEmails.length) return;

        // Get admins
        getAdmins();

    }, [adminEmails, currentProject]);

    useEffect(() => {

        // Reset admins
        if (!currentProject && (adminEmails.length || admins.length)) {
            setAdminEmails([]);
            setAdmins([]);
            return;
        }

        // Set admins
        if (currentProject?.admins.length) setAdminEmails(currentProject.admins);

    }, [currentProject]);

    useEffect(() => {
        if (currentProject?.members.length === 1 && currentProject?.members[0].admin === false) {
            dispatch(setCurrentProject({
                ...currentProject,
                admins: [...currentProject.admins, currentProject.members[0].email]
            }))
        }
    }, [currentProject]);

    useEffect(() => {
        const handleUnload = () => {
          socket.emit('unload', { userId: userInfo?._id });
        };
      
        window.addEventListener('beforeunload', handleUnload);
      
        return () => {
          window.removeEventListener('beforeunload', handleUnload);
        };
      }, [userInfo?._id]);

  return (
    <div className="current-project-admins">
        <span>BOARD ADMINS</span>
        <div className="admins">
            {admins?.length ? admins?.map(admin => {
                if (admin.email === user?.email) {
                    return (
                        <div className="admin" key={generateKey()}>
                            {admin.img_url || admin.base64_img_data
                            ? <>
                                <ProfilePicture src={checkProfileURL(userInfo)}/>
                                <IconContainer title={userInfo?.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(userInfo)}/>
                              </>
                            : <BlankProfilePicture/>}
                            <span>{userName} (You)</span>
                        </div>
                    )
                } else return (
                    <div className="admin" key={generateKey()}>
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
            }) : null}
        </div>
        <button className='btn link' onClick={handleOpenAdminModal}>I'm an admin</button>
    </div>
  )
}

export default ProjectAdmins;