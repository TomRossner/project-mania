import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from './common/ButtonSpinner';
import BlankProfilePicture from "./common/BlankProfilePicture";
import IconContainer from './common/IconContainer';
import {RiImageEditFill, RiEditLine} from "react-icons/ri";
import UserHeader from './UserHeader';
import {FiCheck} from "react-icons/fi";
import { updateUser, updateProfilePicture } from '../httpRequests/http.auth';

const Profile = () => {
  const {userInfo} = useAuth();
  const [readOnly, setReadOnly] = useState(true);
  const [header, setHeader] = useState("");
  const [upload, setUpload] = useState(null);

  const toggleReadOnly = () => setReadOnly(!readOnly);

  const handleSaveHeader = async (header) => {
    if (userInfo.header === header) return;
    setReadOnly(true);
    return await updateUser({...userInfo, header});
  }

  const handleUploadChange = (e) => {
    setUpload(e.target.files[0]);
    handleUpload(e.target.files[0]);
  }

  const handleUpload = async (file) => {
    console.log(file)
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData) // FIX THIS | DOESN'T SHOW ANYTHING


    return await updateProfilePicture({email: userInfo.email, imgData: formData});
  }

  useEffect(() => {
    if (!upload) return;
    // console.log(upload)
  }, [upload])

  return (
    <>
      <div className='profile-container'>
        {userInfo ?
        <>
          <div className='img-container'>
            <div className='profile-img-container'>
              {userInfo?.imgUrl
              ? <img src={userInfo?.imgUrl.toString()} alt="profile"/>
              : <BlankProfilePicture/>}
            </div>
            <input type="file" id='imgUpload' onChange={handleUploadChange}/>
            <label htmlFor='imgUpload'>{<IconContainer icon={<RiImageEditFill className='icon'/>}/>}</label>
          </div>
          <h1>{userInfo.first_name} {userInfo.last_name}</h1>
          <div className='header-container'>
            <UserHeader readOnly={readOnly} setReadOnly={setReadOnly} header={header} setHeader={setHeader}/>
            {readOnly  && <IconContainer icon={<RiEditLine className='icon'/>} onClick={toggleReadOnly}/>}
            {!readOnly && <IconContainer icon={<FiCheck className='icon green'/>} onClick={() => handleSaveHeader(header.trim())}/>}
          </div>
        </>
        : <Spinner/>}
      </div>
    </>
  )
}

export default Profile;