import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import { selectProject } from '../store/project/project.selector';
import { setError, setErrorPopupOpen, setCreatePopupOpen } from '../store/project/project.actions';
import { getProjects } from '../httpRequests/projectsRequests';
import useAuth from '../hooks/useAuth';
import { selectBoards } from '../store/boards/boards.selector';

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useAuth();
  const projects = useSelector(selectBoards);
  const {createPopupOpen} = useSelector(selectProject);
  

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  useEffect(() => {
    // if (!user) {
    //   navigate("/sign-in");
    //   dispatch(setError("You must be logged in to access projects."));
    //   dispatch(setErrorPopupOpen(true));
    //   return;
    // }

    if (createPopupOpen) dispatch(setCreatePopupOpen(false));

  //   const fetchUserProjects = (id) => {
  //     return async (dispatch) => {
  //       try {
  //         const {data: userProjects} = await getProjects(id);
  //         dispatch(setBoards(userProjects));
  //       } catch ({response}) {
  //         console.log(response);
  //       }
  //     }
  //   }
  //   if (!user) return;
  //   dispatch(fetchUserProjects(user._id));
  }, [])

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      {projects?.length ?
      ( <div className='projects-list'>
          {projects.map(project => {
            return (
            <div key={project._id} className='project' onClick={() => handleClick(project)}>
              <p>{project.title}</p>
              <span>{new Date(project.due_date).toDateString()}</span>
            </div>)
          })}
        </div> ) : <Spinner/> /*Remove spinner*/}
    </div>
  )
}

export default Projects;