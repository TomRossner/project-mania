import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import IconContainer from './common/IconContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../store/project/project.selector';
import { setError, setErrorPopupOpen } from '../store/project/project.actions';

const ErrorPopup = () => {
    const dispatch = useDispatch();
    const {error, errorPopupOpen} = useSelector(selectProject);

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