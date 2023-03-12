import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProject from '../hooks/useProject';

const ProfileTab = () => {
    const {user} = useAuth();
    const {handleToggleProfileTab} = useProject();
    
  return (
    <div className='profile-tab-container'>
        {!user
        ? (
        <div className='profile-tab'>
            <Link to="/sign-in" className='link' onClick={handleToggleProfileTab}>Login</Link>
            <Link to="/sign-up" className='link' onClick={handleToggleProfileTab}>Register</Link>
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