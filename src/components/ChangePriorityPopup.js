import React, { useState } from 'react';
import useProject from '../hooks/useProject';
import { priorities } from '../utils/labels';
import { generateKey } from '../utils/keyGenerator';
import { useDispatch, useSelector } from 'react-redux';
import { setChangePriorityPopupOpen } from '../store/globalStates/globalStates.actions';
import { selectCurrentTask } from '../store/project/project.selector';
import { setCurrentProject } from '../store/project/project.actions';
import LabelContainer from './common/LabelsContainer';

const ChangePriorityPopup = () => {
    const currentTask = useSelector(selectCurrentTask);
    const [currentTaskPriority, setCurrentTaskPriority] = useState('');
    const dispatch = useDispatch();
    const {currentProject} = useProject();

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTask = {...currentTask, priority: {...currentTaskPriority}}

        // Update task in current project
        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(stage => {
                if (stage._id === updatedTask.current_stage.id) {
                    return {...stage, stage_tasks: [...stage.stage_tasks.map(task => {
                        if (task._id === updatedTask._id) {
                            return updatedTask;
                        } else return task;
                    })]}
                } else return stage;
        })]}))
        
        closeChangePriorityPopup();
    }

    const handleSelect = (e) => {
        // Find priority by value(id)
        const priority = priorities.find(p => p.id === e.target.value);

        // Set current priority
        setCurrentTaskPriority(priority);
    }

    // Close popup
    const closeChangePriorityPopup = () => {
        dispatch(setChangePriorityPopupOpen(false));
    }

  return (
    <div className='create-popup-container active admin'>
        <form onSubmit={handleSubmit} className="create-popup active">
            <h2>Change priority</h2>
            <select onChange={handleSelect}>
                <option value={currentTask?.priority}>Select priority</option>
                {priorities.map(priority => {
                    if (priority.id === currentTask?.priority.id) return "";
                    else return (
                        <option key={generateKey()} value={priority.id}>
                            {priority.name}
                        </option>
                    )
                })}
            </select>

            <div className='flex-align' id='current-priority'>
                <p>Current priority: </p>
                <LabelContainer priority={currentTask.priority} additionalClass={'no-hover'}/>
            </div>

            <div className='buttons-container'>
                <button type='submit' className='btn blue'>Move</button>
                <button type='button' className='btn cancel' onClick={closeChangePriorityPopup}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default ChangePriorityPopup;