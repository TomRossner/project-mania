import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTask, getTask } from '../httpRequests/projectsRequests';
import Chat from "../components/Chat";
import BackButton from "../components/common/BackButton";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';
import { setCurrentProject } from '../store/project/project.actions';
import {IoMdDoneAll} from "react-icons/io";
import IconContainer from './common/IconContainer';
import ThreeDotsMenu from './common/ThreeDotsMenu';
import { task_options } from '../utils/taskMenuOptions';
import EditElement from './EditElement';
import { defaultTaskProperties } from '../utils/defaultProperties';
import {MdRemoveDone} from "react-icons/md";
import Space from './common/Space';

const Task = () => {
    const {id, stage_id, task_id} = useParams();
    const [activeTask, setActiveTask] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editMenuOpen, setEditMenuOpen] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleMarkAsDone = () => {
      setIsDone(true);
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === activeTask.current_stage.id) {
          return {...stage, tasks_done: stage.stage_tasks.filter(task => task.isDone === true).length + 1 , stage_tasks: [...stage.stage_tasks.map(task => {
            if (task._id === activeTask._id) {
              return {...task, isDone: true};
            } else return task;
          })]};
        } else return stage;
      })]}))
      
    }

    const handleMarkAsNotDone = () => {
      setIsDone(false);
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === activeTask.current_stage.id) {
          return {...stage, tasks_done: stage.stage_tasks.filter(task => task.isDone === true).length - 1 , stage_tasks: [...stage.stage_tasks.map(task => {
            if (task._id === activeTask._id) {
              return {...task, isDone: false};
            } else return task;
          })]};
        } else return stage;
      })]}))
      
    }

    const handleDeleteTask = async () => {
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === activeTask.current_stage.id) {
          return {...stage, tasks_done: stage.tasks_done - 1, stage_tasks: [...stage.stage_tasks.filter(task => task._id !== activeTask._id)]}
        } else return stage;
      })]}))
      await deleteTask({id, stage_id, task_id});
      setActiveTask(null);
      navigate(-1);
    }

    const handleEditTask = () => {
      setMenuOpen(false);
      setEditMenuOpen(true);
    }

    const handleTaskMenu = (e) => {
      setMenuOpen(!menuOpen);
    }

    const handleOption = (opt) => {
      setMenuOpen(false);
      switch(opt) {
        case "Edit":
          return handleEditTask();
        case "Delete":
          return handleDeleteTask();
        default:
          return;
      }
    }

    useEffect(() => {
      const loadTask = async () => {
        const {data: task} = await getTask({id, task_id});
        setActiveTask(task[0]);
        return task[0];
      }
      loadTask();
    }, [])

    useEffect(() => {
      if (!activeTask) return;
      setIsDone(activeTask.isDone);
    }, [activeTask])


  return (
    <>
      {editMenuOpen ? <EditElement element={activeTask} elementDefaultValues={defaultTaskProperties} open={editMenuOpen}/> : null}
      <div className='back-button-container'><BackButton/></div>
      {activeTask ?
      (
        <div className='task-container'>
          <div className="task-top-bar">
            <h1 className='task-title'>{activeTask.title}</h1>
            <div className="buttons-container">
              {isDone &&
              <button className="btn blue" title='Mark as Not Done' onClick={handleMarkAsNotDone}>
                <IconContainer icon={<MdRemoveDone className="icon"/>}/>
              </button>}
              {!isDone &&
              <button className="btn green" title='Mark as Done' onClick={handleMarkAsDone}>
                <IconContainer icon={<IoMdDoneAll className="icon"/>}/>
              </button>}
              <ThreeDotsMenu fn={handleTaskMenu}/>
              <div className={menuOpen ? "options-menu open" : "options-menu"}>
                  {task_options.map(opt => <p key={opt} onClick={() => handleOption(opt)}>{opt}</p>)}
              </div>
            </div>
          </div>
          <p className='task-desc'>{activeTask.description}</p>
          <Space/>
          <Chat/>
        </div>
      ) : <div className='task-container'></div>}
    </>
  )
}

export default Task;