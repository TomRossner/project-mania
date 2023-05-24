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
import ProfilePicture from '../common/ProfilePicture';
import BlankProfilePicture from '../common/BlankProfilePicture';
import { RxCross2 } from 'react-icons/rx';

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
    if (!e.target.value) return;

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

  // Handle remove member
  const handleRemoveMember = (id) => {
    setTeam([...team.filter(member => member._id !== id)]);
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
        <input className="form-title-input" type="text" name='title' readOnly={readOnly} ref={FormTitleRef} onChange={handleInputChange} value={title}/>
        {readOnly && <IconContainer onClick={handleEditFormTitle} icon={<RiEdit2Fill className='icon'/>}/>}
        {!readOnly && <IconContainer additionalClass="check" onClick={validate} icon={<FiCheck className='icon'/>}/>}
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
              <label htmlFor='members'>Team members</label>
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
                      <div key={member._id} onClick={() => handleRemoveMember(member._id)} className='relative' title={`Remove ${member.first_name}`}>
                        {member.base64_img_data || member.img_url
                          ? <ProfilePicture src={member.base64_img_data || member.img_url}/> 
                          : <BlankProfilePicture/>
                        }
                        <IconContainer additionalClass={'circle'} icon={<RxCross2 className='icon'/>}/>
                      </div>
                    )
                  }
                  <span>+ {team.filter((_, index) => index > 3).length} more</span>
                </>
                : team?.map(member =>
                    <div key={member._id} onClick={() => handleRemoveMember(member._id)} className='relative' title={`Remove ${member.first_name}`}>
                      {member.base64_img_data || member.img_url
                        ? <ProfilePicture src={member.base64_img_data || member.img_url}/>
                        : <BlankProfilePicture/>
                      }
                      <IconContainer additionalClass={'circle'} icon={<RxCross2 className='icon'/>}/>
                    </div>
                  )
              }
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