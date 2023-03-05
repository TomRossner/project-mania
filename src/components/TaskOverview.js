import React from 'react';
import { BsClock } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentProject } from '../store/project/project.selector';
import IconContainer from './common/IconContainer';
import LabelContainer from "./common/LabelContainer";
import { labels } from '../utils/labels';

const TaskOverview = ({task}) => {
    const {title, due_date, files, _id, priority, current_stage, subtitle} = task;
    const currentProject = useSelector(selectCurrentProject);
    const navigate = useNavigate();

    const timeLabel = labels.filter(label => label.id === "label_time")[0];
    const dueTodayLabel = labels.filter(label => label.id === "label_due_today")[0];

    // Open task
    const handleOpenTask = (task_id) => {
        navigate(`/projects/${currentProject._id}/${current_stage.id}/${task_id}`);
    }

  return (
    <>
    <div className='listed-task-container' onClick={() => handleOpenTask(_id)}>
        <div className='listed-task-content'>
            <LabelContainer priority={priority} additionalClass="no-hover"/>
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
            {files.length ? <span className='icon-span'><ImAttachment className='icon info'/>{`x${files.length - 1}`}</span> : null}
        </div>
    </div>
    </>
  )
}

export default TaskOverview;