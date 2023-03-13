import React, { useState, useRef, useEffect } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { boardProperties } from "../../utils/defaultProperties";
import Input from '../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatePopupOpen, setError, setErrorPopupOpen } from '../../store/project/project.actions';
import CancelButton from '../common/CancelButton';
import IconContainer from '../common/IconContainer';
import useAuth from '../../hooks/useAuth';
import { selectMembers } from '../../store/members/members.selector';
import { fetchMembersAsync } from '../../store/members/members.actions';
import useProject from '../../hooks/useProject';

const BoardForm = () => {
  const [readOnly, setReadOnly] = useState(true);
  const FormTitleRef = useRef(null);
  const {element, closeCreatePopup, handleRemoveMemberFromProject, addBoard} = useProject();
  const [inputValues, setInputValues] = useState({...boardProperties, type: element});
  const {title, subtitle, due_date} = inputValues;
  const members = useSelector(selectMembers);
  const {user} = useAuth();
  const dispatch = useDispatch();
  const [team, setTeam] =  useState([]);
  //FIX TEAM

  const handleAddMember = (e) => {
    const user = members.find(member => member._id === e.target.value);
    if (user) return setTeam([...team, user]);
    else {
      dispatch(setError("Failed adding user"));
      dispatch(setErrorPopupOpen(true));
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBoard({...inputValues, members: team});
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

  useEffect(() => {
    if (!readOnly) {
      FormTitleRef.current.select();
      FormTitleRef.current.focus();
    }
  }, [readOnly]);

  useEffect(() => {
    // Fetch all members
    dispatch(fetchMembersAsync());
  }, [])

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='form-title-container'>
        <input className="form-title-input" type="text" name='title' readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={title}></input>
        {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}></IconContainer>}
        {!readOnly && <IconContainer additionalClass="check" onClick={validate} icon={<FiCheck className='icon'/>}></IconContainer>}
      </div>
        <div className='form-inputs-container'>

            <Input
              name="subtitle"
              type="text"
              value={subtitle}
              onChange={handleInputChange}
              id="subtitle"
              text="Subtitle"
            />

            <Input
              name="due_date"
              type="date"
              value={due_date}
              onChange={handleInputChange}
              id="due_date"
              text="Due date"
            />

            <div className='input-container'>
              <label htmlFor='members'>Members</label>
              <select onChange={handleAddMember}>
                <option value="">Choose members</option>
                {members?.map(member => {
                  if (member._id === user._id) {
                    return (
                    <option key={member._id} value={member._id}>
                      {member.first_name} {member.last_name} (You)
                    </option>);
                  }
                  else return (
                    <option key={member._id} value={member._id}>
                      {member.first_name} {member.last_name}
                    </option>)
                })}
              </select>
            </div>

            <div className='form-project-members'>
              {team.length > 4
              ?
              <>
                {team?.filter((_, index) => index < 4)
                  .map(member =>
                    <span key={member._id} className='form-project-member-added' onClick={() => handleRemoveMemberFromProject(member._id)}>
                      {member.first_name} {member.last_name.substring(0, 1)}.
                    </span>)}
                <span>+ {team.filter((_, index) => index > 3).length} more</span>
              </>
              : team?.map(member =>
                  <span key={member._id} className='form-project-member-added' onClick={() => handleRemoveMemberFromProject(member._id)}>
                    {member.first_name} {member.last_name.substring(0, 1)}.
                  </span>)}
            </div>

        </div>
        <div className='buttons-container'>
          <button type='submit' className='btn form'>Create {element}</button>
          <CancelButton fn={closeCreatePopup}/>
        </div>
    </form>
  )
}

export default BoardForm;