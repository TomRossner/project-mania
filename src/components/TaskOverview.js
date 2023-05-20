import React, { useState } from 'react';
import { ImAttachment } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import LabelContainer from "./common/LabelsContainer";
import { labels } from '../utils/labels';
import IconContainer from './common/IconContainer';
import { FiCheck } from 'react-icons/fi';
import {MdDoneAll, MdOpenInNew} from "react-icons/md";
import ThreeDotsMenu from "./common/ThreeDotsMenu";
import useProject from '../hooks/useProject';
import { useDrag } from 'react-dnd';
import OptionsMenu from './common/OptionsMenu';
import { task_options } from '../utils/taskMenuOptions';
import { dueDateFormat } from '../utils/timeFormats';

const TaskOverview = ({task}) => {
    const {
        title,
        due_date,
        files,
        _id,
        priority,
        current_stage,
        subtitle
    } = task;
    const {
        currentProject,
        handleMarkAsDone,
        handleMarkAsNotDone,
        handleTaskOptions
    } = useProject();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const [{isDragging}, drag] = useDrag({
        type: 'task',
        item: task,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    // Labels
    const timeLabel = labels.find(label => label.id === "label_time");
    const dueTodayLabel = labels.find(label => label.id === "label_due_today");
    const completedLabel = labels.find(label => label.id === 'label_completed');

    // Open task
    const handleOpenTask = (task_id) => {
        navigate(`/projects/${currentProject._id}/${current_stage.id}/${task_id}`);
    }

    // Toggle options
    const toggleTaskOptions = () => setMenuOpen(!menuOpen);

  return (
    <>
    <div
        className={isDragging ? `listed-task-container drag` : `listed-task-container ${task.isDone ? 'completed' : ''}`}
        ref={drag}
    >
        <div className='listed-task-content'>
            <div className='flex-align space-between'>
                <div className='flex-align space-between gap1'>
                    <LabelContainer priority={priority} additionalClass="no-hover"/>
                    {task.isDone ? <LabelContainer content={labels[labels.length - 1].name} additionalClass={`${completedLabel.color_class} green-bg`}/> : null}
                </div>
                {/* <button className='btn white light' onClick={() => handleOpenTask(_id)} title="Expand">
                    <IconContainer additionalClass="small" icon={<MdOpenInNew className="icon"/>}/>
                </button> */}
            </div>
            <div className='listed-task-title-and-subtitle'>
                <span className='listed-task-title'>{title}</span>
                {subtitle && <p className='listed-task-subtitle'>{subtitle}</p>}
            </div>
        </div>
        <div className='listed-task-infos'>
            <LabelContainer
                additionalClass={`${new Date(due_date).toDateString() === new Date().toDateString() ? `${dueTodayLabel.color_class}-bg border` : `${timeLabel.color_class}-bg`} no-hover`}
                content={<div className={`label-content ${new Date(due_date).toDateString() === new Date().toDateString() ? `${dueTodayLabel.color_class}` : timeLabel.color_class}`}
            >
                {(new Date(due_date).toDateString()) === new Date().toDateString() ? dueTodayLabel.name : `${dueDateFormat(new Date(due_date))}`}</div>}>
            </LabelContainer>
            <div className='quick-actions'>
                <ThreeDotsMenu fn={toggleTaskOptions}/>
                <OptionsMenu options={task_options} boolean={menuOpen} fn={handleTaskOptions} toggleTaskOptions={toggleTaskOptions} fn_arg={task}/>
                {!task.isDone && <button className='btn white green' title='Mark as done' onClick={() => handleMarkAsDone(task)}><IconContainer additionalClass="small green" icon={<FiCheck className='icon'/>}/></button>}
                {task.isDone && <button className='btn white green' title='Mark as not done' onClick={() => handleMarkAsNotDone(task)}><IconContainer additionalClass="small green" icon={<MdDoneAll className='icon green'/>}/></button>}
                {files.length ? <span className='icon-span'><ImAttachment className='icon info'/>{`x${files.length - 1}`}</span> : null}
            </div>
        </div>
    </div>
    </>
  )
}

export default TaskOverview;