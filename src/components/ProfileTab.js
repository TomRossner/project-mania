import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import { UserContext } from '../contexts/UserContext';

const ProfileTab = () => {
    const {setProfileTabOpen, profileTabOpen} = useContext(ProjectContext);
    const {user} = useContext(UserContext);

    const handleToggleProfileTab = () => {
        return setProfileTabOpen(!profileTabOpen);
    }
    
  return (
    <div className='profile-tab-container'>
        {!user
        ? (
        <div className='profile-tab'>
            <Link to="/login" className='link' onClick={handleToggleProfileTab}>Login</Link>
            <Link to="/register" className='link' onClick={handleToggleProfileTab}>Register</Link>
        </div>)
        : (
        <div className='profile-tab'>
          <Link to="/profile" className='link' onClick={handleToggleProfileTab}>View Profile</Link>
          <Link to="/logout" className='link' onClick={handleToggleProfileTab}>Logout</Link>
        </div>)}
    </div>
  )
}

export default ProfileTab;