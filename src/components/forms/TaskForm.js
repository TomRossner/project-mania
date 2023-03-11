import React, { useEffect, useRef, useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultTaskProperties} from "../../utils/defaultProperties";
import Input from "../common/Input";
import IconContainer from "../common/IconContainer";
import { priorities } from '../../utils/labels';
import PriorityLabel from '../common/PriorityLabel';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectProject, selectTasks } from '../../store/project/project.selector';
import { setStage, setCreatePopupOpen, setError, setTaskPriority, setErrorPopupOpen, setCurrentProject, setTasks } from '../../store/project/project.actions';
import { generateId } from '../../utils/IdGenerator';
import CancelButton from '../common/CancelButton';
import LabelContainer from '../common/LabelContainer';

const TaskForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {element, stage: selectedStage, createPopupOpen, taskPriority} = useSelector(selectProject);
    const [inputValues, setInputValues] = useState({...defaultTaskProperties, type: element});
    const {title, description} = inputValues;
    const FormTitleRef = useRef(null);
    const currentProject = useSelector(selectCurrentProject);
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);

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
      dispatch(setTasks([...tasks, newTask]));
  }

    const handleSelectStage = (stage) => {
      return dispatch(setStage(stage));
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
      return setInputValues({...inputValues, [e.target.name]: e.target.value});
    }

    const handleSetPriority = (priority=null) => {
      return dispatch(setTaskPriority(priority));
    }

    useEffect(() => {
      if (!readOnly) {
        FormTitleRef.current.select();
        FormTitleRef.current.focus();
      }
    }, [readOnly]);

    useEffect(() => {
      dispatch(setTaskPriority(priorities[0]));
    }, [])
    
  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name='title' readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={title}></input>
        {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}></IconContainer>}
        {!readOnly && <IconContainer additionalClass='check' onClick={handleEditFormTitle} icon={<FiCheck className='icon'/>}></IconContainer>}
      </div>
        <div className='form-inputs-container'>
          <div className='radio-buttons-container'>
            <p>Add task to:</p>
              <div className='radio-buttons'>
              {currentProject.stages.map((stage) =>
                <div key={stage._id} className='input-container' onClick={() => handleSelectStage(stage)}>
                  <input type="radio" name='stage' id={stage._id} value={stage}/>
                  <label className={stage._id === selectedStage?._id ? "selected" : null} htmlFor={stage.stage_name}>{stage.stage_name}</label>
                </div>
              )}
              </div>
              <p>Priority:</p>
              <div className='radio-buttons'>
                {priorities.map(priority => 
                  <LabelContainer
                    key={priority.id}
                    priority={priority}
                    fn={() => handleSetPriority(priority)}
                    additionalClass={`${priority.name === taskPriority?.name ? "selected" : ""}`}
                  />
                  )}
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
            <Input
              type="text"
              value={inputValues.subtitle}
              id='subtitle'
              name="subtitle"
              onChange={handleInputChange}
              text="Subtitle"
              optional="(optional)"
            />
            <div className='textarea-container'>
              <label htmlFor='description'>Description <span>(optional)</span></label>
              <textarea value={description} maxLength="500" id='description' name="description" onChange={handleInputChange}/>
            </div>

        </div>
        <div className='buttons-container'>
          <button type='submit' className='btn form'>Create {element}</button>
          <CancelButton fn={closeCreatePopup}>Cancel</CancelButton>
        </div>
    </form>
  )
}

export default TaskForm;