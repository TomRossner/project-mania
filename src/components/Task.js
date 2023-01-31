import React from 'react';
import { BsChatLeftText, BsClock } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

const Task = ({task}) => {
    const {title, description, due_date} = task;

    const colorRandomizer = () => {
        const max = 255;

        const red = Math.floor(Math.random() * max);
        const green = Math.floor(Math.random() * max);
        const blue = Math.floor(Math.random() * max);

        const rgb = `(${red}, ${green}, ${blue})`;
        return rgb;
    }


  return (
    <>
    <div className='task-container'>
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

export default Task;