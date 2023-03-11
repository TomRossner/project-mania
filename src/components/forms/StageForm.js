import React, { useEffect, useRef, useState } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import {defaultStageProperties} from "../../utils/defaultProperties";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectProject } from '../../store/project/project.selector';
import { setCreatePopupOpen, setError, setCurrentProject } from '../../store/project/project.actions';
import IconContainer from '../common/IconContainer';
import CancelButton from '../common/CancelButton';
import { selectBoards } from '../../store/boards/boards.selector';
import { setBoards } from '../../store/boards/boards.actions';

const StageForm = () => {
    const [readOnly, setReadOnly] = useState(true);
    const {element, createPopupOpen} = useSelector(selectProject);
    const [inputValues, setInputValues] = useState({...defaultStageProperties, type: element});
    const {stage_name} = inputValues;
    const FormTitleRef = useRef(null);
    const boards = useSelector(selectBoards);
    const currentProject = useSelector(selectCurrentProject);
    const [selectedProject, setSelectedProject] = useState(boards.length ? currentProject : null);
    const dispatch = useDispatch();

    const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));

    const addStage = (values, project) => {
      if (!values || values.type !== 'stage') return dispatch(setError("Invalid values. Could not create stage"));
      if (createPopupOpen) closeCreatePopup();
      const newStage = {...values, project: project.title};
      const projectToAddStage = boards.find(board => board._id === project._id);
      dispatch(setBoards([...boards.filter(board => board._id !== projectToAddStage._id),
          {...projectToAddStage, stages: [...projectToAddStage.stages, newStage]}]));
      if (projectToAddStage._id === currentProject._id) {
          dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages, newStage]}));
      }
  }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      return addStage(inputValues, selectedProject);
    }

    const handleSelectProject = (project) => {
      return setSelectedProject(project);
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

            {/* <div className='textarea-container'>
              <label htmlFor='description'>Description <span>(optional)</span></label>
              <textarea value={description} maxLength="500" id='description' name="description" onChange={handleInputChange}/>
            </div> */}

        </div>
        <div className='buttons-container'>
          <button type='submit' className='btn form'>Create {element}</button>
          <CancelButton fn={closeCreatePopup}>Cancel</CancelButton>
        </div>
    </form>
  )
}

export default StageForm;