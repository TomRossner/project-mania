import React, {useContext} from 'react';
import { BsChatLeftText, BsClock } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';

const TaskOverview = ({task}) => {
    const {title, description, due_date} = task;
    const {currentProject} = useContext(ProjectContext);
    const navigate = useNavigate();

    const colorRandomizer = () => {
        const max = 255;

        const red = Math.floor(Math.random() * max);
        const green = Math.floor(Math.random() * max);
        const blue = Math.floor(Math.random() * max);

        const rgb = `(${red}, ${green}, ${blue})`;
        return rgb;
    }

    const handleOpenTask = (task_id) => {
        navigate(`/projects/${currentProject._id}/${task_id}`);
    }

  return (
    <>
    <div className='task-container' onClick={() => handleOpenTask(task._id)}>
        <div className='task-content'>
            <span className='task-title'>{title}</span>
            <p className='task-description'>{description}</p>
        </div>
        <div className='task-quick-actions'>
            <span className='icon-span'><BsChatLeftText className='icon quick-action'/></span>
            <span className='icon-span'><BsClock className='icon quick-action'/>{due_date}</span>
            <span className='icon-span'><ImAttachment className='icon quick-action'/>x4</span>
        </div>
    </div>
    </>
  )
}

export default TaskOverview;