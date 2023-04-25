import React, { useEffect, useRef, useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultTaskProperties} from "../../utils/defaultProperties";
import Input from "../common/Input";
import IconContainer from "../common/IconContainer";
import { priorities } from '../../utils/labels';
import { useDispatch } from 'react-redux';
import { setTaskPriority } from '../../store/globalStates/globalStates.actions';
import CancelButton from '../common/CancelButton';
import LabelContainer from '../common/LabelContainer';
import useProject from '../../hooks/useProject';
import { ERROR_MESSAGES } from '../../utils/errors';

const TaskForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {
      element,
      stage: selectedStage,
      taskPriority,
      currentProject,
      closeCreatePopup,
      addTask,
      handleSelectStage,
      handleSetPriority,
      showError
    } = useProject();
    const [inputValues, setInputValues] = useState({...defaultTaskProperties, type: element});
    const {title, description} = inputValues;
    const FormTitleRef = useRef(null);
    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
      e.preventDefault();

      closeCreatePopup();
      
      if (!selectedStage) {
        showError(ERROR_MESSAGES.CHOOSE_STAGE_TO_ADD_TASK);
        return;
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