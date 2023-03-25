import React,  { useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';

const UserHeader = ({readOnly, setHeader}) => {
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
        <textarea className='user-header' ref={textRef} readOnly={readOnly} onChange={handleHeaderChange} defaultValue={userInfo.header}/>
    </div>
  )
}

export default UserHeader;