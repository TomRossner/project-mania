import React, { useEffect, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { BsThreeDotsVertical, BsPlus } from 'react-icons/bs';
import TaskOverview from './TaskOverview';
import { stageOptions } from '../../utils/stageOptionsMenu';
import ProgressBar from '../common/ProgressBar';
import OptionsMenu from '../common/OptionsMenu';
import IconContainer from '../common/IconContainer';
import useProject from '../../hooks/useProject';
import { useDrop } from 'react-dnd';

const StageOverview = ({stage}) => {
    const {stage_name, stage_tasks, edit_active} = stage;
    const [inputValue, setInputValue] = useState("");
    const {
        handleAddTask,
        saveStageName,
        handleDeleteStage,
        handleClearStageTasks,
        moveTask
    } = useProject();
    const [{isOver}, drop] = useDrop({
        accept: 'task',
        drop: (task) => handleDropEnd(task),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });
    const [stageTasks, setStageTasks] = useState([]);
    const [tasksDone, setTasksDone] = useState(0);
    const titleRef = useRef();
    const [editActive, setEditActive] = useState(edit_active);
    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);

    const toggleEditActive = () => {
        setEditActive(!editActive);
    }

    const toggleOptionsMenuOpen = () => {
        setOptionsMenuOpen(!optionsMenuOpen);
    }

    useEffect(() => {
        setStageTasks(stage_tasks);
        setTasksDone(Number(stage_tasks.filter(t => t.isDone === true).length));
    }, [stage_tasks])

    const handleDropEnd = (task) => {
        moveTask(task, stage);
    }

    const handleInputChange = (e) => {
        return setInputValue(e.target.value);
    }

    const handleEdit = (stageToUpdate) => {
        setInputValue(stageToUpdate.stage_name);
        toggleEditActive();
    }

    const handleOption = (stage, opt) => {
        toggleOptionsMenuOpen();

        if (!stage || !opt || typeof opt !== 'string') return;

        switch(opt.toLowerCase()) {
            case "edit":
                return handleEdit(stage);
            case "add task":
                return handleAddTask(stage);
            case "delete stage":
                return handleDeleteStage(stage);
            case "clear tasks":
                return handleClearStageTasks(stage);
            default:
                return console.log(`Unknown/unhandled option "${opt}"`);
        }
    }

    const handleSave = (inputValue, stage) => {
        toggleEditActive();
        saveStageName(inputValue, stage);
    } 

    useEffect(() => {
        if (editActive) {
            titleRef.current.focus();
            titleRef.current.select();
        }
    }, [editActive])

  return (
    <div className='stage-container'>
        <div className='stage-title-container'>
            <OptionsMenu options={stageOptions} boolean={optionsMenuOpen} fn={handleOption} fn_arg={stage}/>
            <span className='total-tasks'>{stage.stage_tasks.length}</span>
            <div className='input-container'>
                <input
                    type="text"
                    name='stage_name'
                    readOnly={!editActive}
                    onChange={(e) => handleInputChange(e, stage)}
                    defaultValue={stage_name}
                    className={editActive ? "stage-title-input active" : "stage-title-input"}
                    ref={titleRef}
                />
                {editActive ? <span className='icon-span green' onClick={() => handleSave(inputValue, stage)}><FiCheck className='icon'/></span> : null}
            </div>
            <div className='buttons-container'>
                <IconContainer icon={<BsThreeDotsVertical className='icon dots-menu'/>} onClick={toggleOptionsMenuOpen}/>
                <IconContainer additionalClass='plus' onClick={() => handleAddTask(stage)} icon={<BsPlus className='icon plus'/>}></IconContainer>
            </div>
        </div>
        <div className={isOver ? 'stage-tasks drag' : 'stage-tasks'} ref={drop}>
            {stage_tasks?.map((task, index) => task.current_stage.name === stage_name
            ? <TaskOverview key={index} task={task}/>
            : null)}
        </div>
        {stage_tasks.length ?
        <div className='stage-status'>
            <h4>Status</h4>
            <p>{((tasksDone / stageTasks.length) * 100).toFixed()}% completed</p>
            <ProgressBar stage={stage} tasksDone={tasksDone} totalTasks={Number(stageTasks.length)}/>
        </div>
        : null}
    </div>
  )
}

export default StageOverview;