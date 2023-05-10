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
import Spinner from './common/Spinner';
import { useDispatch } from 'react-redux';
import { setProjectAdmins } from '../store/project/project.actions';
import { setIsAdmin } from '../store/userInfo/userInfo.actions';

const ProjectAdmins = () => {
    const {userInfo, user, userName} = useAuth();
    const {
        currentProject,
        handleOpenAdminModal,
        projectAdmins,
        isAdmin
    } = useProject();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Sockets
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

    // Set online status
    const onlineStatusIcon = (user) => {
        return <BsCircleFill className={user.online ? 'icon online-status green' : 'icon online-status grey'}/>
    }

    // Check profile image
    const checkProfileURL = (user) => {
        return user.base64_img_data ? Buffer.from(user.base64_img_data) : user.img_url.toString();
    }

    // Get admins
    const getAdmins = async () => {

        setLoading(true);

        const updatedAdmins = [];
        
        for (let i = 0; i < projectAdmins.length; i++) {
            const adminObj = await getUserByEmail(projectAdmins[i]);

            // Check if the admin is already in admins array
            const isAlreadyInAdminsArray = admins.some(adm => adm.email === adminObj.email);
            if (isAlreadyInAdminsArray) return setLoading(false);

            // Add admin to array
            updatedAdmins.push(adminObj);
        }

        // Update array
        setAdmins(updatedAdmins);
    }

    // Handle Loading
    useEffect(() => {
        if (admins.length) return setLoading(false);
    }, [admins]);

    // Get admins
    useEffect(() => {
        if (!currentProject || !projectAdmins.length) return;

        // Get admins
        getAdmins();

    }, [projectAdmins]);

    // Check if user is an admin
    useEffect(() => {
        if (!projectAdmins.length) return;

        // Check if user is in project's admins list
        if (projectAdmins.includes(userInfo?.email)) {
            dispatch(setIsAdmin(true));
        }
    }, [projectAdmins]);

    useEffect(() => {

        // Reset admins
        if (!currentProject && (projectAdmins.length || admins.length)) {
            dispatch(setProjectAdmins([]));
            setAdmins([]);
            return;
        }

        // Set admins
        if (currentProject?.admins.length) dispatch(setProjectAdmins(currentProject.admins));

    }, [currentProject]);

    // Handle unload event
    useEffect(() => {
        const handleUnload = () => {
          socket.emit('unload', { userId: userInfo?._id });
        };
      
        window.addEventListener('beforeunload', handleUnload);
      
        return () => {
          window.removeEventListener('beforeunload', handleUnload);
        };
      }, [userInfo]);

  return (
    <div className="current-project-admins">
        <span>BOARD ADMINS</span>
        <div className="admins">
            {loading
                ?   <div id='admins-spinner'><Spinner width={'30px'}/><h3>Loading...</h3></div>
                :   <>
                        {admins?.map(admin => {
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
                        })}
                    </>
            }
        </div>
        {isAdmin ? <button className='btn link' onClick={handleOpenAdminModal}>I'm an admin</button> : null}
    </div>
  )
}

export default ProjectAdmins;