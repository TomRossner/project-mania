import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultStageProperties} from "../../utils/defaultProperties";

const StageForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {selectedElement, setOpen, boards, addStage} = useContext(ProjectContext);
    const [inputValues, setInputValues] = useState({...defaultStageProperties, type: selectedElement});
    const {stage_name, description} = inputValues;
    const FormTitleRef = useRef(null);
    const [selectProject, setSelectProject] = useState(boards.length ? boards[0] : null);

    const handleFormSubmit = (e) => {
      e.preventDefault();
      addStage(inputValues, selectProject);
      setOpen(false);
    }

    const handleSelectProject = (project) => {
      setSelectProject(project)
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

    useEffect(() => {
      if (!selectProject) return;
      // console.log(selectProject.id)
    }, [selectProject])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name="stage_name" readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={stage_name}></input>
        {readOnly && <span className='icon-span' onClick={handleEditFormTitle}><RiEdit2Fill className='icon'/></span>}
        {!readOnly && <span className='icon-span' onClick={handleEditFormTitle}><FiCheck className='icon'/></span>}
      </div>
        <div className='form-inputs-container'>

        <div className='radio-buttons-container'>
          <p>Add stage to:</p>
            <div className='radio-buttons'>
            {boards?.map((board, index) =>
              <div key={index} className='input-container' onClick={() => handleSelectProject(board)}>
                <input type="radio" name='project' id={board._id} value={board._id}/>
                <label className={board._id === selectProject?._id ? "selected" : null} htmlFor={board._id}>{board.title}</label>
              </div>
            )}
            </div>
          </div>

            <div className='textarea-container'>
              <label htmlFor='description'>Description <span>(optional)</span></label>
              <textarea value={description} maxLength="500" id='description' name="description" onChange={handleInputChange}/>
            </div>

        </div>
        <button type='submit' className='btn form'>Create {selectedElement}</button>
    </form>
  )
}

export default StageForm;