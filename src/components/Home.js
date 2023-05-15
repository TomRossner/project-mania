import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import dashboard from "../assets/projectmania/dashboard-desktop.png";
import IconContainer from './common/IconContainer';
import { MdOutlineMenuBook } from 'react-icons/md';

const Home = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    dispatch(setCurrentProject(null));
  }, []);

  return (
    <div className='container home'>
      <h1>Welcome to ProjectMania,</h1>

      <p>A project management tool</p>

      <div className='buttons-container'>
        <Link className='link' to={'/about'}>
          <button className='btn blue'><IconContainer icon={<MdOutlineMenuBook className='icon'/>}/><span>Learn more</span></button>
        </Link>
        <Link className='link' to={isAuthenticated ? '/projects' : '/sign-in'}>
          <button className='btn white'>Start</button>
        </Link>
      </div>

      <img id='hero-img' src={dashboard} alt='showcase'/>
    </div>
  )
}

export default Home;