import React, { useEffect, useRef, useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultStageProperties} from "../../utils/defaultProperties";
import IconContainer from '../common/IconContainer';
import CancelButton from '../common/CancelButton';
import useProject from '../../hooks/useProject';

const StageForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {element, currentProject, boards, closeCreatePopup, addStage} = useProject();
    const [inputValues, setInputValues] = useState({...defaultStageProperties, type: element});
    const {stage_name} = inputValues;
    const FormTitleRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(boards.length ? currentProject : null);

    const handleFormSubmit = (e) => {
      e.preventDefault();
      return addStage(inputValues, selectedProject);
    }

    const handleEditFormTitle = () => {
      return setReadOnly(!readOnly);
    }

    const handleSelectProject = (project) => {
      return setSelectedProject(project);
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

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name="stage_name" readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={stage_name} placeholder="Title"/>
        {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}/>}
        {!readOnly && <IconContainer additionalClass="check" onClick={handleEditFormTitle} icon={<FiCheck className='icon'/>}/>}
      </div>
        <div className='form-inputs-container'>

        <div className='radio-buttons-container'>
          <p>Add stage to:</p>
            <div className='radio-buttons'>
            {boards?.map((board, index) =>
              <div key={index} className='input-container' onClick={() => handleSelectProject(board)}>
                <input type="radio" name='project' id={board._id} value={board._id}/>
                <label className={board._id === selectedProject?._id ? "selected" : null} htmlFor={board._id}>{board.title}</label>
              </div>
            )}
            </div>
          </div>

        </div>
        <div className='buttons-container'>
          <button type='submit' className='btn form'>Create {element}</button>
          <CancelButton fn={closeCreatePopup}>Cancel</CancelButton>
        </div>
    </form>
  )
}

export default StageForm;