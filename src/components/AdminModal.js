import React, { useState, useEffect } from 'react';
import Input from './common/Input';
import useProject from '../hooks/useProject';
import { checkAdminPass } from '../httpRequests/http.auth';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import useAuth from '../hooks/useAuth';

const AdminModal = () => {
    const [inputValue, setInputValue] = useState('');
    const {closeAdminModal, currentProject, showError} = useProject();
    const dispatch = useDispatch();
    const {userInfo} = useAuth();

    // Update inputValue
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Handle submit pass code
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        closeAdminModal();

        if (!inputValue.length) return;

        try {
            // Check if valid
            const isValid = await checkAdminPass(inputValue, currentProject._id);
            
            // If valid, add user email to project admins array
            if (isValid) {
                dispatch(setCurrentProject({...currentProject, admins: [...currentProject.admins, userInfo?.email]}));
            }

        } catch ({response}) {
            showError(response.data.error);
        }
    }

    useEffect(() => {
        if (!inputValue.length) return;
    }, [inputValue]);

  return (
    <div className='create-popup-container active admin'>
        <form onSubmit={handleSubmit} className="create-popup active">
            <h2>Enter admin pass code</h2>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                type='password'
            />
            <div className='buttons-container'>
                <button type='submit' className='btn blue'>Submit</button>
                <button type='button' className='btn cancel' onClick={closeAdminModal}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AdminModal;