import React, { useState, useRef, useEffect } from 'react';
import { RiEdit2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { boardProperties } from "../../utils/defaultProperties";
import Input from '../common/Input';
import { useDispatch } from 'react-redux';
import { setCreatePopupOpen } from '../../store/globalStates/globalStates.actions';
import CancelButton from '../common/CancelButton';
import IconContainer from '../common/IconContainer';
import useAuth from '../../hooks/useAuth';
import { setMembers } from '../../store/members/members.actions';
import useProject from '../../hooks/useProject';
import { ERROR_MESSAGES } from '../../utils/errors';
import useMembers from '../../hooks/useMembers';

const BoardForm = () => {
  const [readOnly, setReadOnly] = useState(true);
  const FormTitleRef = useRef(null);
  const {
    element,
    closeCreatePopup,
    handleRemoveMemberFromProject,
    addBoard,
    showError
  } = useProject();
  const [inputValues, setInputValues] = useState({...boardProperties, type: element});
  const {title, subtitle, due_date} = inputValues;
  const {members} = useMembers();
  const {userInfo} = useAuth();
  const dispatch = useDispatch();
  const [team, setTeam] =  useState([]);

  // Handle add member to team
  const handleAddMember = (e) => {
    const user = members.find(member => member._id === e.target.value);
    
    // Check if user is already in team
    const isAlreadyInTeam = team.some(member => member._id === user._id);

    if (isAlreadyInTeam) {
      return;
    }
    
    // If not in team, add member
    if (!isAlreadyInTeam) return setTeam([...team, user]);

    else {
      showError(ERROR_MESSAGES.ADD_MEMBER_FAILED);
    }
  }

  // Handle submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBoard({...inputValues, members: team});
    dispatch(setCreatePopupOpen(false));
  }

  // Handle input change
  const handleInputChange = (e) => {
    return setInputValues({...inputValues, [e.target.name]: e.target.value});
  }

  // Validate title
  const validate = () => {
    if (!inputValues.title || inputValues.title.length < 2) {
      setInputValues({...inputValues, title: boardProperties.title});
    }
    return setReadOnly(true);
  }
  
  // Handle edit title
  const handleEditFormTitle = () => {
    return setReadOnly(!readOnly);
  }

  // Focus on input when readOnly is false
  useEffect(() => {
    if (!readOnly) {
      FormTitleRef.current.select();
      FormTitleRef.current.focus();
    }
  }, [readOnly]);

  // Check if current user is in members array
  useEffect(() => {
    if (!members.length) return;

    const isInMembers = members.some(member => member._id === userInfo?._id);
    
    if (isInMembers) {
      dispatch(setMembers([...members.filter(member => member._id !== userInfo?._id)]));
    }
  }, [members]);

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
                {members.filter(member => member._id !== userInfo?._id)
                  .map(m => {
                    return (
                      <option key={m._id} value={m._id}>
                        {m.first_name} {m.last_name}
                      </option>
                    )
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