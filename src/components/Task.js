import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask } from '../httpRequests/projectsRequests';
import Chat from "../components/Chat";
import BackButton from "../components/common/BackButton";
import { ProjectContext } from '../contexts/ProjectContext';

const Task = () => {
    const {id, task_id} = useParams();
    const [activeTask, setActiveTask] = useState(null);
    const {setCurrentProject, currentProject} = useContext(ProjectContext);

    const handleMarkAsDone = () => {
      setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage.stage_name === activeTask.current_stage) {
          return {...stage, stage_tasks: [...stage.stage_tasks.map(task => {
            if (task._id === activeTask._id) {
              return {...task, isDone: true};
            } else return task;
          })]};
        } else return stage;
      })]})
    }

    useEffect(() => {
      if (!activeTask) {
        const loadTask = async () => {
          const {data: task} = await getTask({id, task_id});
          console.log(task)
          setActiveTask(task);
          return task;
        }
        loadTask();
      }
    }, [])

    useEffect(() => {
      console.log(activeTask)
    }, [activeTask])

  return (
    <>
      <div className='back-button-container'><BackButton/></div>
      {activeTask ?
      (
        <div className='task-container'>
          <div className="task-top-bar">
            <h1 className='task-title'>{activeTask.title}</h1>
            <div className="buttons-container">
              <button className="btn" onClick={handleMarkAsDone}>Mark as Done</button>
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