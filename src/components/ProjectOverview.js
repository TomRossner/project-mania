import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { BsCircleFill } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
// import { RiEdit2Fill } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
// import { team } from '../temp/team';
import { projectMenuOptions } from "../utils/projectMenuOptions";
import StageOverview from './StageOverview';

const ProjectOverview = () => {
    const {boards,
        setBoards,
        projectMembers,
        currentProject,
        setCurrentProject,
        availableMembers,
        setCreatePopupOpen,
        setSelectedElement
    } = useContext(ProjectContext);
    const NUMBER_OF_MEMBERS_TO_DISPLAY = 4;
    const [membersPopUpTabOpen, setMembersPopUpTabOpen] = useState(false);
    const [projectMenuOpen, setProjectMenuOpen] = useState(false);

    

    const toggleMembersPopUpTab = () => {
        setMembersPopUpTabOpen(!membersPopUpTabOpen);
    }

    

    const handleAddMember = (member) => {
        if (!member) return;

        const MemberAlreadyAdded = projectMembers.find(m => m._id === member._id);
        if (MemberAlreadyAdded) return;
        else setCurrentProject({...currentProject, members: [...currentProject.members, member]});
    }

    const toggleProjectMenu = () => {
        return setProjectMenuOpen(!projectMenuOpen);
    }

    const handleAddStage = () => {
        setCreatePopupOpen(true);
        setSelectedElement("stage");
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

    useEffect(() => {
        if (!currentProject) return;
        const updateBoards = () => setBoards([...boards.map(board => {
            if (board._id === currentProject._id) {
                return {...currentProject};
            } else return board;
        })])

        updateBoards();
    }, [currentProject])

  return (
    <>
    {currentProject ?
    <div className="project-overview">
        <div className="current-board-toolbar">
            <h2>{currentProject.title}</h2>
            <span className='icon-span'><BsCircleFill className='icon dot'/></span>
            <span className='current-board-due-date'>Due Date: {currentProject.due_date}</span>
            <span className='icon-span'><BsCircleFill className='icon dot'/></span>
            <div className='current-board-members-container'>
                <span className='current-board-members'>Members:
                {projectMembers.length > NUMBER_OF_MEMBERS_TO_DISPLAY
                ?
                <>
                    {projectMembers.filter((_, index) => index < NUMBER_OF_MEMBERS_TO_DISPLAY)
                    .map(member => 
                        <span key={member._id} className='icon-span'>
                            <BsCircleFill className='icon'/>
                            <span className='name-overlay'>
                                {member.name.substring(0, 1).toUpperCase()}{member.last_name.substring(0, 1).toUpperCase()}
                            </span>
                        </span>)}
                    <span>+ {projectMembers.filter((_, index) => index > 3).length}</span>
                </>
                : projectMembers.map(member =>
                    <span key={member._id} className='icon-span'>
                        <BsCircleFill className='icon'/>
                        <span className='name-overlay'>
                            {member.first_name.substring(0, 1).toUpperCase()}{member.last_name.substring(0, 1).toUpperCase()}
                        </span>
                    </span>
                    )}
                    <span className='icon-span add' onClick={toggleMembersPopUpTab}><RxPlus className='icon'/>
                    {membersPopUpTabOpen
                        ?   <div className='options-menu open'>
                                {availableMembers?.map((member, index) => <p key={index} onClick={() => handleAddMember(member)}>
                                    {member.first_name} {member.last_name}</p>)}
                            </div>
                        : null}
                    </span>
                </span>
            </div>
            <span className='icon-span' onClick={toggleProjectMenu}><CgMenuGridO className='icon'/></span>
            <div className={projectMenuOpen ? "options-menu open" : "options-menu"}>
                {projectMenuOptions.map(opt => <p key={opt} onClick={() => handleMenuOption(opt)}>{opt}</p>)}
            </div>
        </div>
        <hr className='line'/>
        <div className='current-board-stages-container'>
            {currentProject?.stages?.map((stage) => {
                return (<StageOverview key={stage._id} stage={stage}/>)})}
        </div>
    </div>
    : null}
    {/* replace NULL with something */}
    </>
  )
}

export default ProjectOverview;