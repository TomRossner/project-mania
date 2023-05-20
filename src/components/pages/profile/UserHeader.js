import React,  { useEffect, useRef } from 'react';
import useAuth from '../../../hooks/useAuth';
import IconContainer from '../../common/IconContainer';
import { RiEditLine } from 'react-icons/ri';
import { FiCheck } from 'react-icons/fi';

const UserHeader = ({readOnly, setHeader, header, handleSaveHeader, toggleReadOnly}) => {
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

        {readOnly && (
          <IconContainer
            icon={<RiEditLine className='icon'/>}
            onClick={toggleReadOnly}
            title="Edit header"
          />
        )}

        {!readOnly && (
          <IconContainer
            icon={<FiCheck className='icon green'/>}
            onClick={() => handleSaveHeader(header.trim())}
            title="Save changes"
          />
        )}

    </div>
  )
}

export default UserHeader;