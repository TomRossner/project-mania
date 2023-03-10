import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultTaskProperties} from "../../utils/defaultProperties";
import Input from "../common/Input";
import IconContainer from "../common/IconContainer";


const TaskForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {selectedElement, setCreatePopupOpen, currentProject, addTask, selectStage, setSelectStage, setError, setErrorPopupOpen} = useContext(ProjectContext);
    const [inputValues, setInputValues] = useState({...defaultTaskProperties, type: selectedElement});
    const {title, description} = inputValues;
    const FormTitleRef = useRef(null);
    

    const handleSelectStage = (stage) => {
      setSelectStage(stage);
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      setCreatePopupOpen(false);
      if (!selectStage) {
        setError("Couldn't create task. Please choose in which stage you would like to add your task to.");
        return setErrorPopupOpen(true);
      } else addTask(inputValues, selectStage);
    }

    const handleEditFormTitle = () => {
      return setReadOnly(!readOnly);
    }

    const handleInputChange = (e) => {
      return setInputValues({...inputValues, [e.target.name]: e.target.value});
    }

    useEffect(() => {
      if (!readOnly) FormTitleRef.current.focus();
    }, [readOnly]);
    
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
                  <label className={stage.stage_name === selectStage?.stage_name ? "selected" : null} htmlFor={stage.stage_name}>{stage.stage_name}</label>
                </div>
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
            <div className='textarea-container'>
              <label htmlFor='description'>Description <span>(optional)</span></label>
              <textarea value={description} maxLength="500" id='description' name="description" onChange={handleInputChange}/>
            </div>

        </div>
        <button type='submit' className='btn form'>Create {selectedElement}</button>
    </form>
  )
}

export default TaskForm;