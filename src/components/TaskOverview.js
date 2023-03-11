import React, {useState} from 'react';
import { ImAttachment } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentProject, selectTasks } from '../store/project/project.selector';
import {VscTrash} from "react-icons/vsc";
import LabelContainer from "./common/LabelContainer";
import { labels } from '../utils/labels';
import IconContainer from './common/IconContainer';
import { FiCheck } from 'react-icons/fi';
import { deleteTask } from '../httpRequests/projectsRequests';
import { setTasks, setCurrentProject } from '../store/project/project.actions';
import {MdRemoveDone, MdOpenInNew} from "react-icons/md";

const TaskOverview = ({task}) => {
    const {title, due_date, files, _id, priority, current_stage, subtitle} = task;
    const currentProject = useSelector(selectCurrentProject);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const [isDone, setIsDone] = useState(false);


    const timeLabel = labels.filter(label => label.id === "label_time")[0];
    const dueTodayLabel = labels.filter(label => label.id === "label_due_today")[0];

    // Open task
    const handleOpenTask = (task_id) => {
        navigate(`/projects/${currentProject._id}/${current_stage.id}/${task_id}`);
    }

    const handleDeleteTask = async () => {
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
          if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.tasks_done === 0 ? 0 : stage.tasks_done - 1, stage_tasks: [...stage.stage_tasks.filter(task => task._id !== _id)]}
          } else return stage;
        })]}))
        await deleteTask({id: currentProject._id, stage_id: current_stage.id, task_id: _id});
        dispatch(setTasks([...tasks.filter(task => task._id !== _id)]));
    }

    const handleMarkAsDone = () => {
        setIsDone(true);
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
          if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.stage_tasks.filter(task => task.isDone === true).length + 1 , stage_tasks: [...stage.stage_tasks.map(task => {
              if (task._id === _id) {
                return {...task, isDone: true};
              } else return task;
            })]};
          } else return stage;
        })]}))
    }

    const handleMarkAsNotDone = () => {
        setIsDone(false);
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
          if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.stage_tasks.filter(task => task.isDone === true).length - 1 , stage_tasks: [...stage.stage_tasks.map(task => {
              if (task._id === _id) {
                return {...task, isDone: false};
              } else return task;
            })]};
          } else return stage;
        })]}))
        
      }

  return (
    <>
    <div className='listed-task-container'>
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
                {!isDone && <button className='btn white green' title='Mark as done' onClick={handleMarkAsDone}><IconContainer additionalClass="small" icon={<FiCheck className='icon'/>}/></button>}
                {isDone && <button className='btn white green' title='Mark as not done' onClick={handleMarkAsNotDone}><IconContainer additionalClass="small" icon={<MdRemoveDone className='icon'/>}/></button>}
                <button className='btn white red' title='Delete task' onClick={handleDeleteTask}><IconContainer additionalClass="small" icon={<VscTrash className='icon'/>}/></button>
                {files.length ? <span className='icon-span'><ImAttachment className='icon info'/>{`x${files.length - 1}`}</span> : null}
            </div>
        </div>
    </div>
    </>
  )
}

export default TaskOverview;