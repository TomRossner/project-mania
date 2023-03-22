import React, { useEffect, useRef, useState } from 'react';
import IconContainer from './common/IconContainer';
import { CgMenuGridO } from 'react-icons/cg';
import ProjectMembers from './ProjectMembers';
import { projectMenuOptions } from "../utils/projectMenuOptions";
import { useDispatch } from 'react-redux';
import { setCurrentProject, setProjectMenuOpen, setTasks } from '../store/project/project.actions';
import {AiFillProject} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import useProject from '../hooks/useProject';
import {FiCheck} from "react-icons/fi";
import Space from "./common/Space";

const ProjectInfoBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        projectMenuTabOpen,
        currentProject,
        handleAddStage,
        handleMenuClick,
        handleDeleteProject,
        tasks
    } = useProject();
    const [inputValue, setInputValue] = useState("");
    const titleRef = useRef();

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
            case 'edit project name':
                return toggleEditActive();
            case 'delete project':
                return handleDeleteProject(currentProject._id);
            default:
                return opt;
        }
    }

    const handleManageTeam = () => {
        navigate("/users");
    }

    const handleInputChange = (e) => setInputValue(e.target.value);

    const validateProjectName = (input = inputValue) => {
        if (!input || !input.length) {
            return dispatch(setCurrentProject({...currentProject, title: currentProject.title, edit_active: false}));
        } else {
            // Update project title and set edit_active to false
            dispatch(setCurrentProject({...currentProject, title: input.trim(), edit_active: false}));

            // Update all tasks. Each task object contains a project property which contains the project name and id
            return dispatch(setTasks([...tasks.map(t => {
                return {...t, project: {
                    title: input.trim(),
                    id: currentProject._id
                }}
            })]));
        }
    }

    const toggleEditActive = () => {
        dispatch(setCurrentProject({...currentProject, edit_active: !currentProject.edit_active}));
    }

    useEffect(() => {
        if (currentProject.edit_active) {
            titleRef.current.select();
            titleRef.current.focus();
        }
    }, [currentProject])

  return (
    <>
    <div className="current-board-info-bar">
        <div className='project-title-container'>
            <h3>BOARD</h3>
            <div className='project-title'>
                <IconContainer icon={<AiFillProject className='icon'/>}/>
                <div className='input-container'>
                    <input
                        type="text"
                        ref={titleRef}
                        readOnly={!currentProject.edit_active}
                        onChange={handleInputChange}
                        defaultValue={currentProject.title}
                        className={currentProject.edit_active ? "title-input active" : "title-input"}
                    />
                    {currentProject.edit_active
                    ?   <span className='icon-span green' id="check" onClick={() => validateProjectName(inputValue)}>
                            <FiCheck className='icon check' title='Save'/>
                        </span>
                    : null}
                </div>
            </div>
        </div>
        <Space/>
        <ProjectMembers/>
        <span className='icon-span menu' onClick={handleMenuClick}><CgMenuGridO className='icon'/></span>
        <div className={projectMenuTabOpen ? "options-menu open" : "options-menu"}>
            {projectMenuOptions.map(opt => <p key={opt} onClick={() => handleMenuOption(opt)}>{opt}</p>)}
        </div>
    </div>
    </>
  )
}

export default ProjectInfoBar;