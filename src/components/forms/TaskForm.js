import React, { useEffect, useRef, useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultTaskProperties} from "../../utils/defaultProperties";
import Input from "../common/Input";
import IconContainer from "../common/IconContainer";
import { priorities } from '../../utils/labels';
import PriorityLabel from '../common/PriorityLabel';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectProject } from '../../store/project/project.selector';
import { setStage,setCreatePopupOpen, setError, setTaskPriority, setErrorPopupOpen, setCurrentProject } from '../../store/project/project.actions';
import { generateId } from '../../utils/IdGenerator';

const TaskForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {element, stage: selectedStage, createPopupOpen, taskPriority} = useSelector(selectProject);
    const [inputValues, setInputValues] = useState({...defaultTaskProperties, type: element});
    const {title, description} = inputValues;
    const FormTitleRef = useRef(null);
    const currentProject = useSelector(selectCurrentProject);
    const dispatch = useDispatch();

    const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));
    
    const addTask = (values, stageToUpdate) => {
      if (!values || values.type !== 'task') return setError("Invalid values. Could not create task");
      if (createPopupOpen) closeCreatePopup();
      const newTask = {
          ...values,
          current_stage: {
              name: stageToUpdate.stage_name,
              id: stageToUpdate._id
          },
          project: {
              title: currentProject.title,
              id: currentProject._id
          },
          _id: generateId(),
          messages: [],
          priority: taskPriority
      };
      dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(current_project_stage => {
              if (current_project_stage._id === stageToUpdate._id) {
                  return {...current_project_stage, stage_tasks: [...current_project_stage.stage_tasks, newTask]}
              } else return current_project_stage;
      })]}))
  }

    const handleSelectStage = (stage) => {
      dispatch(setStage(stage));
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      dispatch(setCreatePopupOpen(false));
      if (!selectedStage) {
        dispatch(setError("Couldn't create task. Please choose in which stage you would like to add your task to."));
        return dispatch(setErrorPopupOpen(true));
      } else {
        addTask(inputValues, selectedStage);
      }
    }

    const handleEditFormTitle = () => {
      return setReadOnly(!readOnly);
    }

    const handleInputChange = (e) => {
      return dispatch(setInputValues({...inputValues, [e.target.name]: e.target.value}));
    }

    const handleSetPriority = (priority) => {
      return dispatch(setTaskPriority(priority));
    }

    useEffect(() => {
      if (!readOnly) FormTitleRef.current.focus();
    }, [readOnly]);

    // useEffect(() => {
    //   if (!user) {
    //     navigate("/login");
    //     setError("You must be logged in to create projects/stages/tasks.");
    //     setErrorPopupOpen(true);
    //     setCreatePopupOpen(false);
    //     return;
    //   }
    // }, [])
    
  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name='title' readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={title}></input>
        {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}></IconContainer>}
        {!readOnly && <IconContainer onClick={handleEditFormTitle} icon={<FiCheck className='icon'/>}></IconContainer>}
      </div>
        <div className='form-inputs-container'>
          <div className='radio-buttons-container'>
            <p>Add task to:</p>
              <div className='radio-buttons'>
              {currentProject.stages.map((stage) =>
                <div key={stage._id} className='input-container' onClick={() => handleSelectStage(stage)}>
                  <input type="radio" name='stage' id={stage._id} value={stage.stage_name}/>
                  <label className={stage.stage_name === selectedStage?.stage_name ? "selected" : null} htmlFor={stage.stage_name}>{stage.stage_name}</label>
                </div>
              )}
              </div>
              <p>Priority:</p>
              <div className='radio-buttons'>
                {priorities.map(priority =>
                  <PriorityLabel key={priority.id} priority={priority} fn={() => handleSetPriority(priority)}/>)}
              </div>
          </div>
            <Input
              type="date"
              value={inputValues.due_date}
              id='due_date'
              name="due_date"
              onChange={handleInputChange}
              text="Due date"
            />
            <div className='textarea-container'>
              <label htmlFor='description'>Description <span>(optional)</span></label>
              <textarea value={description} maxLength="500" id='description' name="description" onChange={handleInputChange}/>
            </div>

        </div>
        <button type='submit' className='btn form'>Create {element}</button>
    </form>
  )
}

export default TaskForm;