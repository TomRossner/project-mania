import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    dispatch(setCurrentProject(null));
  }, []);

  return (
    <div className='container home'>
        <h1>Welcome to ProjectMania,</h1>

        <p>A project and task management tool</p>

        <div className='buttons-container'>
          <Link className='link' to={'/about'}>
            <button className='btn blue'>About</button>
          </Link>
          <Link className='link' to={isAuthenticated ? '/projects' : '/sign-in'}>
            <button className='btn white'>Start</button>
          </Link>
        </div>
    </div>
  )
}

export default Home;