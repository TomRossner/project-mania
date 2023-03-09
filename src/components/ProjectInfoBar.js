import React, { useEffect } from 'react';
import IconContainer from './common/IconContainer';
import { BsCircleFill } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import ProjectMembers from './ProjectMembers';
import { projectMenuOptions } from "../utils/projectMenuOptions";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectProject } from '../store/project/project.selector';
import { setProjectMenuOpen, setCreatePopupOpen, setElement, setCurrentProject } from '../store/project/project.actions';
import {AiFillProject} from "react-icons/ai";
import { deleteProject } from '../httpRequests/projectsRequests';
import { useNavigate } from 'react-router-dom';
import { selectBoards } from '../store/boards/boards.selector';
import { setBoards } from '../store/boards/boards.actions';

const ProjectInfoBar = () => {
    const dispatch = useDispatch();
    const {projectMenuTabOpen} = useSelector(selectProject);
    const currentProject = useSelector(selectCurrentProject);
    const boards = useSelector(selectBoards);
    const navigate = useNavigate();
    
    const handleMenuClick = () => {
        dispatch(setProjectMenuOpen(!projectMenuTabOpen));
    }

    const handleMenuOption = (opt) => {
        if (!opt || typeof opt !== 'string') return;
        dispatch(setProjectMenuOpen(false));

        switch(opt.toLowerCase()) {
            case 'view project summary':
                return console.log(opt);
            case 'add stage':
                return handleAddStage();
            case 'manage team':
                return handleManageTeam();
            case 'edit project':
                return console.log(opt);
            case 'delete project':
                return handleDeleteProject(currentProject._id);
            default:
                return opt;
        }
    }

    const handleManageTeam = () => {
        navigate("/users");
    }

    const handleDeleteProject = async (id) => {
        await deleteProject(id);
        dispatch(setCurrentProject(null));
        dispatch(setBoards([...boards.filter(board => board._id !== currentProject._id)]));
        navigate("/");
    }
    
    const handleAddStage = () => {
        dispatch(setCreatePopupOpen(true));
        dispatch(setProjectMenuOpen(false));
        dispatch(setElement("stage"));
    }

  return (
    <>
    <div className="current-board-info-bar">
        <div className='project-title-container'>
            <h3>BOARD</h3>
            <div className='project-title'>
                <IconContainer icon={<AiFillProject className='icon'/>}></IconContainer>
                <h2 className='blue'>{currentProject.title}</h2>
            </div>
        </div>
        {/* <IconContainer icon={<BsCircleFill className='icon dot'/>}/> */}
        {/* <p className='current-board-due-date'>Due Date: <span className='white'>{new Date(currentProject.due_date).toDateString()}</span></p> */}
        {/* <IconContainer icon={<BsCircleFill className='icon dot'/>}/> */}
        <div className='flex1'></div>
        <ProjectMembers/>
        <span className='icon-span menu' onClick={handleMenuClick}><CgMenuGridO className='icon'/></span>
        <div className={projectMenuTabOpen ? "options-menu open" : "options-menu"}>
            {projectMenuOptions.map(opt => <p key={opt} onClick={() => handleMenuOption(opt)}>{opt}</p>)}
        </div>
    </div>
    {/* <p className='current-board-subtitle'>{currentProject.subtitle}</p> */}
    </>
  )
}

export default ProjectInfoBar;