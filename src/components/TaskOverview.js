import React, { useState } from 'react';
import { ImAttachment } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import LabelContainer from "./common/LabelContainer";
import { labels } from '../utils/labels';
import IconContainer from './common/IconContainer';
import { FiCheck } from 'react-icons/fi';
import {MdDoneAll, MdOpenInNew} from "react-icons/md";
import ThreeDotsMenu from "./common/ThreeDotsMenu";
import useProject from '../hooks/useProject';
import { useDrag } from 'react-dnd';
import OptionsMenu from './common/OptionsMenu';
import { task_options, task_options_admin } from '../utils/taskMenuOptions';
import useAuth from '../hooks/useAuth';

const TaskOverview = ({task}) => {
    const {title, due_date, files, _id, priority, current_stage, subtitle} = task;
    const {
        currentProject,
        handleMarkAsDone,
        handleMarkAsNotDone,
        handleTaskOptions
    } = useProject();
    const {userInfo} = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const [{isDragging}, drag] = useDrag({
        type: 'task',
        item: task,
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const timeLabel = labels.filter(label => label.id === "label_time")[0];
    const dueTodayLabel = labels.filter(label => label.id === "label_due_today")[0];

    // Open task
    const handleOpenTask = (task_id) => {
        navigate(`/projects/${currentProject._id}/${current_stage.id}/${task_id}`);
    }

    const toggleTaskOptions = () => setMenuOpen(!menuOpen);

  return (
    <>
    <div
        className={isDragging ? 'listed-task-container drag' : 'listed-task-container'}
        ref={drag}
    >
        <div className='listed-task-content'>
            <div className='flex-align space-between'>
                <LabelContainer priority={priority} additionalClass="no-hover"/>
                <button className='btn white light' onClick={() => handleOpenTask(_id)} title="Expand">
                    <IconContainer additionalClass="small" icon={<MdOpenInNew className="icon"/>}/>
                </button>
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
                {new Date(due_date).toDateString() === new Date().toDateString() ? dueTodayLabel.name : new Date(due_date).toDateString()}</div>}>
            </LabelContainer>
            <div className='quick-actions'>
                <ThreeDotsMenu fn={toggleTaskOptions}/>
                
                <OptionsMenu
                    options={userInfo?.admin === true ? task_options_admin : task_options}
                    boolean={menuOpen}
                    fn={handleTaskOptions}
                    toggleTaskOptions={toggleTaskOptions}
                    fn_arg={task}
                />

                {!task.isDone &&
                    <button
                        className='btn white green'
                        title='Mark as done'
                        onClick={() => handleMarkAsDone(task)}
                    >
                        <IconContainer
                            additionalClass="small green"
                            icon={<FiCheck className='icon'/>}
                        />
                    </button>
                }

                {task.isDone &&
                    <button
                        className='btn white green'
                        title='Mark as not done'
                        onClick={() => handleMarkAsNotDone(task)}
                    >
                        <IconContainer
                            additionalClass="small green"
                            icon={<MdDoneAll className='icon green'/>}
                        />
                    </button>
                }

                {/* <button className='btn white red' title='Delete task' onClick={handleDeleteTask}><IconContainer additionalClass="small" icon={<VscTrash className='icon'/>}/></button> */}
                {files.length ? <span className='icon-span'><ImAttachment className='icon info'/>{`x${files.length - 1}`}</span> : null}
            </div>
        </div>
    </div>
    </>
  )
}

export default TaskOverview;