import React, { useContext } from 'react';
import IconContainer from './common/IconContainer';
import { BsCircleFill } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { ProjectContext } from '../contexts/ProjectContext';
import ProjectMembers from './ProjectMembers';
import { projectMenuOptions } from "../utils/projectMenuOptions";

const ProjectInfoBar = () => {
    const {currentProject, setCreatePopupOpen, setSelectedElement, projectMenuOpen, setProjectMenuOpen} = useContext(ProjectContext);
    
    const handleMenuClick = () => {
        setProjectMenuOpen(!projectMenuOpen);
    }

    const handleMenuOption = (opt) => {
        if (!opt || typeof opt !== 'string') return;

        if (opt.toLowerCase() === 'view project summary') return console.log(opt);
        if (opt.toLowerCase() === 'add stage') return handleAddStage();
        if (opt.toLowerCase() === 'add/remove members') return console.log(opt);
        if (opt.toLowerCase() === 'edit project') return console.log(opt);
        if (opt.toLowerCase() === 'delete project') return console.log(opt);
        
        else return console.log(`Unknown/unhandled option "${opt}".`);
    }

    const handleAddStage = () => {
        setCreatePopupOpen(true);
        setProjectMenuOpen(false);
        setSelectedElement("stage");
    }

  return (
    <>
    <div className="current-board-info-bar">
        <h2 className='blue'>{currentProject.title}</h2>
        <IconContainer icon={<BsCircleFill className='icon dot'/>}/>
        <p className='current-board-due-date'>Due Date: <span className='white'>{new Date(currentProject.due_date).toDateString()}</span></p>
        <IconContainer icon={<BsCircleFill className='icon dot'/>}/>
        <ProjectMembers/>
        <IconContainer icon={<CgMenuGridO className='icon'/>} onClick={handleMenuClick}/>
        <div className={projectMenuOpen ? "options-menu open" : "options-menu"}>
            {projectMenuOptions.map(opt => <p key={opt} onClick={() => handleMenuOption(opt)}>{opt}</p>)}
        </div>
    </div>
    </>
  )
}

export default ProjectInfoBar;