import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import IconContainer from './common/IconContainer';
import { useDispatch } from 'react-redux';
import { setError, setErrorPopupOpen } from '../store/project/project.actions';
import useProject from '../hooks/useProject';

const ErrorPopup = () => {
    const dispatch = useDispatch();
    const {error, errorPopupOpen} = useProject();

    const resetErrorMessage = () => dispatch(setError(""));

    const handleCloseErrorPopup = () => {
        dispatch(setErrorPopupOpen(false));
        resetErrorMessage();
    }

  return (
    <>
    {error ?
    (
      <div className={errorPopupOpen ? 'background-blur active' : 'background-blur off'}>
        <div className={errorPopupOpen ? 'error-popup-container active' : 'error-popup-container'}>
            <h3 className='red'>Error</h3>
            <IconContainer icon={<RxCross2 className='icon'/>} onClick={handleCloseErrorPopup}/>
            <p className='flex1'>{error}
            </p>
            <button className='btn white' onClick={handleCloseErrorPopup}>OK</button>
        </div>
      </div>
    )
    : null}
    </>
  )
}

export default ErrorPopup;