import React, {useContext, useEffect} from 'react';
import { BsChatLeftText, BsClock } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

const TaskOverview = ({task}) => {
    const {title, description, due_date, files, _id} = task;
    const {currentProject} = useContext(ProjectContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!task) return;
        console.log(task)
    }, [task])

    const handleOpenTask = (task_id) => {
        navigate(`/project-mania-frontend/projects/${currentProject._id}/${task_id}`);
    }

  return (
    <>
    <div className='listed-task-container' onClick={() => handleOpenTask(_id)}>
        <div className='listed-task-content'>
            <span className='listed-task-title'>{title}</span>
            <p className='listed-task-description'>{description}</p>
        </div>
        <div className={task.isDone ? 'listed-task-infos blue-bg' : 'listed-task-infos'}>
            {/* <span className='icon-span'><BsChatLeftText className='icon quick-action'/></span> */}
            <span className='icon-span'><BsClock className='icon info'/>{new Date(due_date).toDateString()}</span>
            {files.length ? <span className='icon-span'><ImAttachment className='icon info'/>{`x${files.length - 1}`}</span> : null}
        </div>
    </div>
    </>
  )
}

export default TaskOverview;