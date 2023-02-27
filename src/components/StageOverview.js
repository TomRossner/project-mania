import React, { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import TaskOverview from './TaskOverview';
import { stageOptions } from '../utils/stageOptionsMenu';
import ProgressBar from './common/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectUserProjects } from '../store/project/project.selector';
import { setCurrentProject, setStage, setCreatePopupOpen, setElement, setBoards } from '../store/project/project.actions';

const StageOverview = ({stage}) => {
    const {stage_name, stage_tasks, edit_active, options_menu_open} = stage;
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);
    const boards = useSelector(selectUserProjects);
    
    const toggleStageOptions = (stageToUpdate) => {
        if (!stageToUpdate) return;

        const updatedStage = {...stageToUpdate, options_menu_open: !stageToUpdate.options_menu_open}
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open && stage._id !== stageToUpdate._id) {
                return {...stage, options_menu_open: false};
            }
            else if (!stage.options_menu_open && stage._id !== stageToUpdate._id) {
                return stage;
            }
            else return updatedStage;
        })]}));
    }

    const handleOption = (stage, opt) => {
        if (!stage || !opt || typeof opt !== 'string') return;

        if (opt.toLowerCase() === "edit") return handleEdit(stage);
        if (opt.toLowerCase() === "add task") return handleAddTask(stage);
        if (opt.toLowerCase() === "delete") return handleDeleteStage(stage);
        else return console.log(`Unknown/unhandled option "${opt}".`);
    }

    const handleInputChange = (e) => {
        return setInputValue(e.target.value);
    }

    const validate = (inputValue, stageToUpdate) => {
        if (!inputValue || !stageToUpdate) return;

        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage._id === stageToUpdate._id) {
                return {...stage, stage_name: inputValue, edit_active: false, stage_tasks: [...stage.stage_tasks.map(task => {
                    return {...task, current_stage: {...task.current_stage, name: inputValue}};
                })]};
            } else return stage;
        })]}));
    }

    const closeStageOptionMenus = () => {
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open) {
                return {...stage, options_menu_open: false};
            } else return stage;
        })]}));
    }

    const handleEdit = (stageToUpdate) => {
        if (!stageToUpdate) return;

        setInputValue(stageToUpdate.stage_name);
        const updatedStage = {...stageToUpdate, edit_active: !stageToUpdate.edit_active, options_menu_open: false}
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.edit_active && stage._id !== stageToUpdate._id) {
                return {...stage, edit_active: false, options_menu_open: false};
            }
            else if (!stage.edit_active && stage._id !== stageToUpdate._id) {
                return {...stage, options_menu_open: false};
            }
            else return updatedStage;
        })]}));
    }

    const handleAddTask = (stageToAddTaskTo) => {
        closeStageOptionMenus();
        dispatch(setStage(stageToAddTaskTo));
        dispatch(setCreatePopupOpen(true));
        dispatch(setElement("task"));
    }

    const handleDeleteStage = (stageToDelete) => {
        if (!stageToDelete) return;

        closeStageOptionMenus();
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.filter(stage => stage._id !== stageToDelete._id)]}));
    }

    // Update boards every time currentProject changes
    useEffect(() => {
        if (!currentProject) return;
        const updateBoards = () => dispatch(setBoards([...boards.map(board => {
            if (board._id === currentProject._id) {
                return {...currentProject};
            } else return board;
        })]))

        updateBoards();
    }, [currentProject])

  return (
    <div className='stage-container'>
        {options_menu_open
            ?   <div className="options-menu open">
                    {stageOptions.map(opt => <p key={opt} onClick={() => handleOption(stage, opt)}>{opt}</p>)}
                </div>
            : <div className="options-menu"></div>}
        <div className='input-container'>
            <input
                type="text"
                name='stage_name'
                readOnly={!edit_active}
                onChange={(e) => handleInputChange(e, stage)}
                defaultValue={stage_name}
                className={edit_active ? "stage-title-input active" : "stage-title-input"}
            />
            {edit_active ? <span className='icon-span' onClick={() => validate(inputValue, stage)}><FiCheck className='icon'/></span> : null}
        </div>
        <span className='icon-span dots-menu' onClick={() => toggleStageOptions(stage)}><BsThreeDotsVertical className='icon'/></span>
        <hr className='line'/>
        <div className='stage-tasks'>
            {stage_tasks?.map((task, index) => task.current_stage.name === stage_name
            ? <TaskOverview key={index} task={task}/>
            : null)}
        </div>
        <div className='flex1'></div>
        <div className='stage-status'>
            <h4 className='white'>Status</h4>
            <p className='white'>{stage_tasks.length ? ((stage_tasks.filter(task => task.isDone === true).length / stage_tasks.length) * 100).toFixed() : 0}% completed</p>
            <ProgressBar stage={stage} tasksDone={Number(stage.tasks_done)} totalTasks={Number(stage_tasks.length)}/>
        </div>
    </div>
  )
}

export default StageOverview;