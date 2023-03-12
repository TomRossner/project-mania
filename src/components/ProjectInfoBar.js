import React from 'react';
import IconContainer from './common/IconContainer';
import { CgMenuGridO } from 'react-icons/cg';
import ProjectMembers from './ProjectMembers';
import { projectMenuOptions } from "../utils/projectMenuOptions";
import { useDispatch } from 'react-redux';
import { setProjectMenuOpen } from '../store/project/project.actions';
import {AiFillProject} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import useProject from '../hooks/useProject';

const ProjectInfoBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectMenuTabOpen, currentProject, handleAddStage, handleMenuClick, handleDeleteProject} = useProject();

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