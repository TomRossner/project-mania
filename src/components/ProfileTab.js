import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

const ProfileTab = () => {
    const {setProfileTabOpen, profileTabOpen} = useContext(ProjectContext);

    const handleToggleProfileTab = () => {
        return setProfileTabOpen(!profileTabOpen);
    }
    
  return (
    <div className='profile-tab-container'>
        <div className='profile-tab'>
            <Link to="/project-mania-frontend/login" className='link' onClick={handleToggleProfileTab}>Login</Link>
            <Link to="/project-mania-frontend/register" className='link' onClick={handleToggleProfileTab}>Register</Link>
        </div>
    </div>
  )
}

export default ProfileTab;