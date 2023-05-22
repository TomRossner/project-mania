import React, { useEffect, useState } from 'react';
import ProfilePicture from '../common/ProfilePicture';
import IconContainer from '../common/IconContainer';
import BlankProfilePicture from '../common/BlankProfilePicture';
import useAuth from '../../hooks/useAuth';
import useProject from '../../hooks/useProject';
import { BsCircleFill } from 'react-icons/bs';
import { getUserByEmail } from '../../services/api/http.members';
import { generateKey } from '../../utils/keyGenerator';
import Spinner from '../common/Spinner';
import { useDispatch } from 'react-redux';
import { setCurrentProject, setProjectAdmins } from '../../store/project/project.actions';
import { setIsAdmin } from '../../store/userInfo/userInfo.actions';
import useSocketEvents from '../../hooks/useSocketEvents';

const ProjectAdmins = () => {
    const {userInfo, userName} = useAuth();
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

    // Handle online event
    const handleOnline = (data) => {
        if (admins.some(adm => adm._id === data.userId)) {
            setAdmins([...admins.map(adm => {
                if (adm._id === data.userId) {
                    return {...adm, online: true};
                } else return adm;
            })])
        }
    }
    
    // Handle offline event
    const handleOffline = (data) => {
        if (admins.some(adm => adm._id === data.userId)) {
            setAdmins([...admins.map(adm => {
                if (adm._id === data.userId) {
                    return {...adm, online: false};
                } else return adm;
            })])
        }
    }

    // Listen to socket events
    useSocketEvents({
        events: {
            online: handleOnline,
            offline: handleOffline
        }
    });

    // Set online status
    const onlineStatusIcon = (user) => {
        return <BsCircleFill className={user.online === true ? 'icon online-status green' : 'icon online-status grey'}/>
    }

    // Check profile image
    const checkProfileURL = (user) => {
        return user.base64_img_data ? Buffer.from(user.base64_img_data) : user.img_url.toString();
    }

    // Remove admin access
    const handleRemoveAdminAccess = (userEmail) => {
        dispatch(setCurrentProject({
            ...currentProject,
            admins: [...currentProject.admins.filter(admEmail => admEmail !== userEmail)]
        }));
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

    // Set/reset project admins
    useEffect(() => {

        // Reset admins
        if ((!currentProject && (projectAdmins.length || admins.length)) || !currentProject?.admins.length) {
            dispatch(setProjectAdmins([]));
            setAdmins([]);
            return;
        }

        // Set admins
        if (currentProject?.admins.length) {
            dispatch(setProjectAdmins(currentProject.admins));
        }

    }, [currentProject]);

    // useEffect(() => {
    //     console.log(isAdmin)
    // }, [isAdmin])

  return (
    <div className="current-project-admins">
        <div className='flex-align space-between'>
            <span>PROJECT ADMINS</span>
            {!isAdmin
                ? <button className='btn link text-blue no-scale' onClick={handleOpenAdminModal}>Get admin access</button>
                : <button className='btn link text-blue no-scale' onClick={() => handleRemoveAdminAccess(userInfo?.email)}>Remove admin access</button>
            }
        </div>
        <div className="admins">
            {loading
                ?   <div id='admins-spinner'><Spinner width={'30px'}/><h3>Loading...</h3></div>
                :   <>
                        {admins?.map(admin => {
                            if (admin.email === userInfo?.email) {
                                return (
                                    <div className="admin" key={generateKey()}>
                                        {admin.img_url || admin.base64_img_data
                                            ?   <>
                                                    <ProfilePicture src={checkProfileURL(userInfo)}/>
                                                    <IconContainer title={userInfo?.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(userInfo)}/>
                                                </>
                                            :   <>
                                                    <BlankProfilePicture/>
                                                    <IconContainer title={userInfo?.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(userInfo)}/>
                                                </>
                                        }
                                        <span>{userName} (You)</span>
                                    </div>
                                )
                            } else return (
                                <div className="admin" key={generateKey()}>
                                    {admin.img_url || admin.base64_img_data
                                        ?   <>
                                                <ProfilePicture src={checkProfileURL(admin)}/>
                                                <IconContainer title={admin.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(admin)}/>
                                            </>
                                        :   <>
                                                <BlankProfilePicture/>
                                                <IconContainer title={admin.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(admin)}/>
                                            </>
                                    }
                                    <span>{admin.first_name} {admin.last_name}</span>
                                </div>
                            )
                        })}
                    </>
            }
        </div>
    </div>
  )
}

export default ProjectAdmins;