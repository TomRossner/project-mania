import React, { useEffect, useRef, useState } from 'react';
import PriorityLabel from './common/PriorityLabel';
import IconContainer from './common/IconContainer';
import { priorities } from '../utils/labels';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectProject } from '../store/project/project.selector';
import { setCurrentProject, setTaskPriority } from '../store/project/project.actions';
import Input from './common/Input';
import {RiEdit2Fill} from "react-icons/ri";
import { FiCheck } from 'react-icons/fi';


const EditElement = ({element, elementDefaultValues, open}) => {
    const {taskPriority} = useSelector(selectProject);
    const [readOnly, setReadOnly] = useState(true);
    const dispatch = useDispatch();
    const currentProject = useSelector(selectCurrentProject);
    const [inputValues, setInputValues] = useState(elementDefaultValues);
    const FormTitleRef = useRef(null);

    const handleEditFormTitle = () => {
        return setReadOnly(!readOnly);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // return dispatch(setCurrentProject({...currentProject}))
    }

    const handleInputChange = (e) => {
        return setInputValues({...inputValues, [e.target.name]: e.target.value});
    }

    const handleSetPriority = (priority) => {
        return dispatch(setTaskPriority(priority));
    }

    useEffect(() => {
        if (!readOnly) FormTitleRef.current.focus();
    }, [readOnly])

  return (
    <div className={`create-popup-container ${open === true ? 'active' : ''}`}>
        <form onSubmit={handleFormSubmit}>
            <div className='form-title-container'>
                <input
                    className="form-title-input"
                    type="text" name='title'
                    readOnly={readOnly}
                    ref={FormTitleRef}
                    onChange={handleInputChange}
                    value={elementDefaultValues.title || elementDefaultValues.name || elementDefaultValues.stage_name}
                />
                {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}></IconContainer>}
                {!readOnly && <IconContainer onClick={handleEditFormTitle} icon={<FiCheck className='icon'/>}></IconContainer>}
            </div>
            <div className='form-inputs-container'>
                {element.type === "task" ?
                <div className='radio-buttons-container'>
                    <p>Priority:</p>
                    <div className='radio-buttons'>
                        {priorities.map(priority => 
                        <div className={priority.name === taskPriority.name ? "label-container selected": "label-container"} onClick={() => handleSetPriority(priority)}>
                            <PriorityLabel key={priority.id} priority={priority}/>
                        </div>
                        )}
                    </div>
                </div> : null}
                {element.type !== "stage" ?
                <Input
                    type="date"
                    value={inputValues.due_date}
                    id='due_date'
                    name="due_date"
                    onChange={handleInputChange}
                    text="Due date"
                /> : null}
                <div className='textarea-container'>
                    <label htmlFor='description'>Description <span>(optional)</span></label>
                    <textarea value={inputValues.description} maxLength="500" id='description' name="description" onChange={handleInputChange}/>
                </div>

            </div>
            <button type='submit' className='btn form'>Save changes</button>
            <button className='btn form'>Cancel</button>
        </form>
    </div>
  )
}

export default EditElement