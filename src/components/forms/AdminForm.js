import React, { useState } from 'react';
import useProject from '../../hooks/useProject';
import Input from '../common/Input';
import { ERROR_MESSAGES } from '../../utils/errors';
import { updateAdminPass } from '../../services/api/http.project';

const AdminForm = () => {
    const [inputValues, setInputValues] = useState({
        pass: "",
        confirm_pass: ""
    });
    const {pass, confirm_pass} = inputValues;
    const {currentProject, closeAdminForm, showError} = useProject();

    const handleInputChange = (e) => {
        return setInputValues({...inputValues, [e.target.name]: e.target.value});
    }

    const handleSkip = () => {
        closeAdminForm();
        // Add notification to set admin pass code somewhere
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        closeAdminForm();

        if (!pass.length || !pass) return;

        if (confirm_pass !== pass) {
            showError(ERROR_MESSAGES.ADMIN_CODES_DO_NOT_MATCH);
            return;
        } else {
            await updateAdminPass(pass, currentProject._id);
        }
    }

  return (
    <div className='create-popup-container active admin'>
        <form onSubmit={handleSubmit} className="create-popup active">
            <h2>Create Admin pass code</h2>
            <Input type="password" onChange={handleInputChange} value={pass} name="pass" placeholderText="Pass code"/>
            <Input type="password" onChange={handleInputChange} value={confirm_pass} name="confirm_pass" placeholderText="Confirm pass code"/>
            <div className='buttons-container'>
                <button type='submit' className='btn form'>Add pass code</button>
                <button type='button' className='btn cancel' onClick={handleSkip}>Skip for now</button>
            </div>
        </form>
    </div>
  )
}

export default AdminForm;