import React from 'react';
import { BsClock } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentProject } from '../store/project/project.selector';
import LabelsContainer from "./common/LabelsContainer";

const TaskOverview = ({task}) => {
    const {title, description, due_date, files, _id, priority, current_stage} = task;
    const currentProject = useSelector(selectCurrentProject);
    const navigate = useNavigate();

    // Open task
    const handleOpenTask = (task_id) => {
        navigate(`/projects/${currentProject._id}/${current_stage.id}/${task_id}`);
    }

  return (
    <>
    <div className='listed-task-container' onClick={() => handleOpenTask(_id)}>
        <div className='listed-task-content'>
            <LabelsContainer priority={priority}/>
            <span className='listed-task-title'>{title}</span>
            {/* <p className='listed-task-description'>{description}</p> */}
        </div>
        <div className={task.isDone ? 'listed-task-infos blue-bg' : 'listed-task-infos'}>
            <span className='icon-span'><BsClock className='icon info'/>{new Date(due_date).toDateString()}</span>
            {files.length ? <span className='icon-span'><ImAttachment className='icon info'/>{`x${files.length - 1}`}</span> : null}
        </div>
    </div>
    </>
  )
}

export default TaskOverview;