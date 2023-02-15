import React, { useState, useRef, useEffect, useContext } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { ProjectContext } from '../../contexts/ProjectContext';
import { boardProperties } from "../../utils/defaultProperties";
import Input from '../common/Input';

const BoardForm = () => {
  const [readOnly, setReadOnly] = useState(true);
  const {selectedElement, addBoard, setCreatePopupOpen, setProjectMembers, projectMembers, availableMembers} = useContext(ProjectContext);
  const FormTitleRef = useRef(null);
  const [inputValues, setInputValues] = useState({...boardProperties, type: selectedElement});
  const {title, subtitle, due_date} = inputValues;


  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBoard(inputValues);
    setCreatePopupOpen(false);
  }

  const handleInputChange = (e) => {
    return setInputValues({...inputValues, [e.target.name]: e.target.value});
  }

  const validate = () => {
    if (!inputValues.title || inputValues.title.length < 2) {
      setInputValues({...inputValues, title: boardProperties.title});
    }
    return setReadOnly(true);
  }
  
  const handleEditFormTitle = () => {
    return setReadOnly(!readOnly);
  }

  const handleAddMembers = (e) => {
    if (!e.target.value) return;
    const newMember = availableMembers?.find(member => e.target.value === member._id);
    if (projectMembers.find(member => newMember._id === member._id)) return;
    else setProjectMembers([...projectMembers, availableMembers?.find(member => e.target.value === member._id)]);
  }

  const handleRemoveMemberFromProject = (id) => {
    if (!id) return;
    const memberToRemove = projectMembers.find(member => member._id === id);
    if (!memberToRemove) throw new Error("Member not found");
    else setProjectMembers(projectMembers.filter(member => member._id !== memberToRemove._id));
  }

  useEffect(() => {
    if (!readOnly) FormTitleRef.current.focus();
  }, [readOnly]);

  useEffect(() => {
    if (projectMembers.length) setProjectMembers([]);
  }, [])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name='title' readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={title}></input>
        {readOnly && <span className='icon-span' onClick={handleEditFormTitle}><RiEdit2Fill className='icon'/></span>}
        {!readOnly && <span className='icon-span' onClick={validate}><FiCheck className='icon'/></span>}
      </div>
        <div className='form-inputs-container'>

            <Input name="subtitle" type="text" value={subtitle} onChange={handleInputChange} id="subtitle" text="Subtitle"/>

            <Input name="due_date" type="date" value={due_date} onChange={handleInputChange} id="due_date" text="Due date"/>

            <div className='input-container'>
              <label htmlFor='members'>Members</label>
              <select onChange={handleAddMembers}>
                <option value="">Choose members</option>
                {availableMembers?.map(member => <option key={member._id} value={member._id}>{member.first_name} {member.last_name}</option>)}
              </select>
            </div>

            <div className='form-project-members'>
              {projectMembers.length > 4
              ?
              <>
                {projectMembers.filter((_, index) => index < 4)
                  .map(member =>
                    <span key={member._id} className='form-project-member-added' onClick={() => handleRemoveMemberFromProject(member._id)}>
                      {member.first_name} {member.last_name.substring(0, 1)}.
                    </span>)}
                <span>+ {projectMembers.filter((_, index) => index > 3).length} more</span>
              </>
              : projectMembers.map(member =>
                  <span key={member._id} className='form-project-member-added' onClick={() => handleRemoveMemberFromProject(member._id)}>
                    {member.first_name} {member.last_name.substring(0, 1)}.
                  </span>)}
            </div>

        </div>
        <button type='submit' className='btn form'>Create {selectedElement}</button>
    </form>
  )
}

export default BoardForm;