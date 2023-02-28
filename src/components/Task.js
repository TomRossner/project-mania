import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTask, getTask, updateProject } from '../httpRequests/projectsRequests';
import Chat from "../components/Chat";
import BackButton from "../components/common/BackButton";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';
import { setCurrentProject } from '../store/project/project.actions';

const Task = () => {
    const {id, stage_id, task_id} = useParams();
    const [activeTask, setActiveTask] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);

    const handleMarkAsDone = () => {
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === activeTask.current_stage.id) {
          return {...stage, stage_tasks: [...stage.stage_tasks.map(task => {
            if (task._id === activeTask._id) {
              return {...task, isDone: true};
            } else return task;
          })]};
        } else return stage;
      })]}))
      
    }

    const updateTasksDone = () => {
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === activeTask.current_stage.id) {
          return {...stage, tasks_done: stage.stage_tasks.filter(task => task.isDone === true).length};
        } else return stage;
      })]}))
    }

    const handleDeleteTask = async () => {
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === activeTask.current_stage.id) {
          return {...stage, stage_tasks: [...stage.stage_tasks.filter(task => task._id !== activeTask._id)]}
        } else return stage;
      })]}))
      await deleteTask({id, stage_id, task_id});
      return navigate(-1);
      // Need to refresh currentProject after deletion.
      // setActiveTask to null?
      // setCurrentProject and filter tasks?
    }

    useEffect(() => {
      const loadTask = async () => {
        const {data: task} = await getTask({id, task_id});
        setActiveTask(task[0]);
        return task[0];
      }
      loadTask();
    }, [])


    // Update tasks_done every time activeTask changes 
    useEffect(() => {
      if (!activeTask) return;
      updateTasksDone();
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
              <button className="btn" onClick={handleDeleteTask}>Delete task</button>
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