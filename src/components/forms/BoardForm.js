import React, { useState, useRef, useEffect } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { boardProperties } from "../../utils/defaultProperties";
import Input from '../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../httpRequests/auth';
import { addProject } from '../../httpRequests/projectsRequests';
import { selectProject } from '../../store/project/project.selector';
import { setCreatePopupOpen, setError, setErrorPopupOpen } from '../../store/project/project.actions';
import CancelButton from '../common/CancelButton';
import IconContainer from '../common/IconContainer';
import useAuth from '../../hooks/useAuth';
import { selectBoards } from '../../store/boards/boards.selector';
import { selectMembers } from '../../store/members/members.selector';
import { setBoards } from '../../store/boards/boards.actions';
import { selectProjectMembers } from '../../store/projectMembers/projectMembers.selector';
import { setProjectMembers } from '../../store/projectMembers/projectMembers.actions';

const BoardForm = () => {
  const [readOnly, setReadOnly] = useState(true);
  const FormTitleRef = useRef(null);
  const {element, createPopupOpen} = useSelector(selectProject);
  const [inputValues, setInputValues] = useState({...boardProperties, type: element});
  const {title, subtitle, due_date} = inputValues;
  const projectMembers = useSelector(selectProjectMembers);
  const members = useSelector(selectMembers);
  const boards = useSelector(selectBoards);
  const {user} = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(members)
  }, [members])

  const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));

  const addBoard = async (values) => {
    if (values.type !== 'board') return setError("Invalid values. Could not create board");
    if (createPopupOpen) closeCreatePopup();
    try {
        const {data: userInfo} = await getUserInfo(user._id);
        const response = await addProject({...values, members: [...projectMembers, userInfo]});
        const newProject = response.data;
        dispatch(setBoards([...boards, {...newProject, due_date: new Date(newProject.due_date).toDateString()}]));
    } catch ({response}) {
        if (response.data.error && response.status === 400) {
            dispatch(setError(response.data.error));
            dispatch(setErrorPopupOpen(true));
        }
    }
}


  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBoard(inputValues);
    dispatch(setCreatePopupOpen(false));
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
    const newMember = members?.find(member => e.target.value.trim() === member._id);
    if (projectMembers.find(member => newMember._id === member._id)) return;
    else dispatch(setProjectMembers([...projectMembers, members?.find(member => e.target.value.trim() === member._id)]));
  }

  const handleRemoveMemberFromProject = (id) => {
    if (!id) return;
    const memberToRemove = projectMembers.find(member => member._id === id);
    if (!memberToRemove) throw new Error("Member not found");
    else dispatch(setProjectMembers(projectMembers.filter(member => member._id !== memberToRemove._id)));
  }

  useEffect(() => {
    if (!readOnly) {
      FormTitleRef.current.select();
      FormTitleRef.current.focus();
    }
  }, [readOnly]);

  useEffect(() => {
    if (projectMembers.length) dispatch(setProjectMembers([]));
  }, [])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name='title' readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={title}></input>
        {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}></IconContainer>}
        {!readOnly && <IconContainer additionalClass="check" onClick={validate} icon={<FiCheck className='icon'/>}></IconContainer>}
      </div>
        <div className='form-inputs-container'>

            <Input name="subtitle" type="text" value={subtitle} onChange={handleInputChange} id="subtitle" text="Subtitle"/>

            <Input name="due_date" type="date" value={due_date} onChange={handleInputChange} id="due_date" text="Due date"/>

            <div className='input-container'>
              <label htmlFor='members'>Members</label>
              <select onChange={handleAddMembers}>
                <option value="">Choose members</option>
                {members?.map(member => <option key={member._id} value={member._id}>{member.first_name} {member.last_name}</option>)}
              </select>
            </div>

            <div className='form-project-members'>
              {projectMembers.length > 4
              ?
              <>
                {projectMembers?.filter((_, index) => index < 4)
                  .map(member =>
                    <span key={member._id} className='form-project-member-added' onClick={() => handleRemoveMemberFromProject(member._id)}>
                      {member.first_name} {member.last_name.substring(0, 1)}.
                    </span>)}
                <span>+ {projectMembers.filter((_, index) => index > 3).length} more</span>
              </>
              : projectMembers?.map(member =>
                  <span key={member._id} className='form-project-member-added' onClick={() => handleRemoveMemberFromProject(member._id)}>
                    {member.first_name} {member.last_name.substring(0, 1)}.
                  </span>)}
            </div>

        </div>
        <div className='buttons-container'>
          <button type='submit' className='btn form'>Create {element}</button>
          <CancelButton fn={closeCreatePopup}>Cancel</CancelButton>
        </div>
    </form>
  )
}

export default BoardForm;