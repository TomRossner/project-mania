import React,  { useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import IconContainer from './common/IconContainer';
import { RiEditLine } from 'react-icons/ri';
import { FiCheck } from 'react-icons/fi';

const UserHeader = ({readOnly, setHeader, toggleReadOnly, handleSaveHeader, header}) => {
    const textRef = useRef();
    const {userInfo} = useAuth()

    const handleHeaderChange = (e) => {
        setHeader(e.target.value);
    }

    useEffect(() => {
        if (!readOnly) textRef.current.focus();
    }, [readOnly])

  return (
    <div className='user-header-container'>
        <textarea
          className='user-header'
          ref={textRef}
          readOnly={readOnly}
          onChange={handleHeaderChange}
          defaultValue={userInfo.header}
        />
    </div>
  )
}

export default UserHeader;