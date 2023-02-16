import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import { RxCross2 } from 'react-icons/rx';
import IconContainer from './common/IconContainer';

const ErrorPopup = () => {
    const {error, setErrorPopupOpen, errorPopupOpen, resetErrorMessage} = useContext(ProjectContext);

    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false);
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
              <button className='btn red error-btn' onClick={handleCloseErrorPopup}>OK</button>
            </p>
        </div>
      </div>
    )
  : null}
    </>
  )
}

export default ErrorPopup;