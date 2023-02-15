import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask } from '../httpRequests/projectsRequests';
import Chat from "../components/Chat";
import BackButton from "../components/common/BackButton";

const Task = () => {
    const {id, task_id} = useParams();
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
      if (!activeTask) {
        const loadTask = async () => {
          const task = await getTask({id, task_id});
          setActiveTask(task);
          return task;
        }
        loadTask();
      }
    }, [])

  return (
    <>
      <div className='back-button-container'><BackButton/></div>
      {activeTask ?
      (
        <div className='task-container'>
          <div className="task-top-bar">
            <h1 className='task-title'>{activeTask.title}</h1>
            <div className="buttons-container">
              <button className="btn">Mark as Done</button>
              <button className="btn">Delete task</button>
            </div>
          </div>
          <p className='task-desc'>{activeTask.description}</p>
          <div className="flex1"></div>
          <Chat/>
        </div>
      ) : <div className='task-container'></div>}
    </>
  )
}

export default Task;