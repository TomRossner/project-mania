import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProfileTabOpen } from '../store/project/project.actions';
import { selectProject } from '../store/project/project.selector';
import useAuth from '../hooks/useAuth';

const ProfileTab = () => {
    const {user} = useAuth();
    const {profileTabOpen} = useSelector(selectProject);
    const dispatch = useDispatch();

    const handleToggleProfileTab = () => {
        return dispatch(setProfileTabOpen(!profileTabOpen));
    }
    
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