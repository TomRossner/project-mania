import React, { useContext, useState, useEffect } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { BsCircleFill } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import { FiCheck } from "react-icons/fi";
// import { RiEdit2Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { stageOptions } from "../utils/stageOptionsMenu";
import Task from './Task';
// import { team } from '../temp/team';
import { projectMenuOptions } from "../utils/projectMenuOptions";

const ProjectOverview = () => {
    const {boards,
        setBoards,
        projectMembers,
        currentProject,
        setCurrentProject,
        availableMembers
    } = useContext(ProjectContext);
    const NUMBER_OF_MEMBERS_TO_DISPLAY = 4;
    const [inputValue, setInputValue] = useState("");
    const [membersPopUpTabOpen, setMembersPopUpTabOpen] = useState(false);
    const [projectMenuOpen, setProjectMenuOpen] = useState(false);

    const handleInputChange = (e) => {
        return setInputValue(e.target.value);
    }

    const validate = (inputValue, stageToUpdate) => {
        if (!inputValue || !stageToUpdate) return;

        return setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (Number(stage._id) === Number(stageToUpdate._id)) {
                return {...stage, stage_name: inputValue, edit_active: false, stage_tasks: [...stage.stage_tasks.map(task => {
                    return {...task, current_stage: inputValue};
                })]};
            } else return stage;
        })]});
    }

    const closeStageOptionMenus = () => {
        return setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open) {
                return {...stage, options_menu_open: false};
            } else return stage;
        })]});
    }

    const toggleStageOptions = (stageToUpdate) => {
        if (!stageToUpdate) return;

        const updatedStage = {...stageToUpdate, options_menu_open: !stageToUpdate.options_menu_open}
        return setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open && Number(stage._id) !== Number(stageToUpdate._id)) {
                return {...stage, options_menu_open: false};
            }
            else if (!stage.options_menu_open && Number(stage._id) !== Number(stageToUpdate._id)) {
                return stage;
            }
            else return updatedStage;
        })]});
    }

    const handleEdit = (stageToUpdate) => {
        if (!stageToUpdate) return;

        setInputValue(stageToUpdate.stage_name);
        const updatedStage = {...stageToUpdate, edit_active: !stageToUpdate.edit_active, options_menu_open: false}
        return setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.edit_active && Number(stage._id) !== Number(stageToUpdate._id)) {
                return {...stage, edit_active: false, options_menu_open: false};
            }
            else if (!stage.edit_active && Number(stage._id) !== Number(stageToUpdate._id)) {
                return {...stage, options_menu_open: false};
            }
            else return updatedStage;
        })]});
    }

    const handleAddTask = (stageToAddTaskTo) => {
        closeStageOptionMenus();
    }

    const handleDeleteStage = (stageToDelete) => {
        if (!stageToDelete) return;

        closeStageOptionMenus();
        return setCurrentProject({...currentProject, stages: [...currentProject.stages.filter(stage => stage._id !== stageToDelete._id)]});
    }

    const toggleMembersPopUpTab = () => {
        setMembersPopUpTabOpen(!membersPopUpTabOpen);
    }

    const handleOption = (stage, opt) => {
        if (!stage || !opt || typeof opt !== 'string') return;

        if (opt.toLowerCase() === "edit") return handleEdit(stage);
        if (opt.toLowerCase() === "add task") return handleAddTask(stage);
        if (opt.toLowerCase() === "delete") return handleDeleteStage(stage);
        else return console.log(`Unknown/unhandled option "${opt}".`);
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

    const handleMenuOption = (opt) => {
        if (!opt || typeof opt !== 'string') return;

        if (opt.toLowerCase() === 'view project summary') return console.log(opt);
        if (opt.toLowerCase() === 'add stage') return console.log(opt);
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
            {currentProject?.stages?.map((stage, index) => {
                const {stage_name} = stage;
                return (<div key={index} className='stage-container'>
                    {stage.options_menu_open
                        ?   <div className="options-menu open">
                                {stageOptions.map(opt => <p key={opt} onClick={() => handleOption(stage, opt)}>{opt}</p>)}
                            </div>
                        : <div className="options-menu"></div>}
                    <div className='input-container'>
                        <input
                            type="text"
                            name='stage_name'
                            readOnly={!stage.edit_active}
                            onChange={(e) => handleInputChange(e, stage)}
                            defaultValue={stage_name}
                            className={stage.edit_active ? "stage-title-input active" : "stage-title-input"}
                        />
                        {stage.edit_active ? <span className='icon-span' onClick={() => validate(inputValue, stage)}><FiCheck className='icon'/></span> : null}
                    </div>
                    <span className='icon-span dots-menu' onClick={() => toggleStageOptions(stage)}><BsThreeDotsVertical className='icon'/></span>
                    <hr className='line'/>
                    <div className='stage-tasks'>
                        {stage.stage_tasks?.map((task, index) => task.current_stage === stage.stage_name
                        ? <Task key={index} task={task}/>
                        : null)}
                    </div>
                    <div className='flex1'></div>
                    <button className='btn'>Add card</button>
                </div>)})}
        </div>
    </div>
    : null}
    {/* replace NULL with something */}
    </>
  )
}

export default ProjectOverview;