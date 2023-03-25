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
  const [headerModal, setHeaderModal] = useState(true);

  const toggleReadOnly = () => setReadOnly(!readOnly);

  const handleSaveHeader = async (header) => {
    if (userInfo.header === header) return;
    setReadOnly(true);
    return await updateUser({...userInfo, header});
  }

  const handleUploadChange = (e) => {
    handleUpload(e.target.files[0]);
  }

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64EncodedFile = reader.result;
      return await updateProfilePicture({email: userInfo.email, imgData: base64EncodedFile});
    }
  }

  const closeHeaderModal = () => {
    setHeaderModal(false);
  }

  return (
    <>
      <div className='profile-container'>
        {userInfo ?
        <>
          <div className='img-container'>
            <div className='profile-img-container'>
              {userInfo.img_url || userInfo.base64_img_data
              ? <img src={userInfo.base64_img_data ? Buffer.from(userInfo.base64_img_data) : userInfo.img_url.toString()} alt="profile"/>
              : <BlankProfilePicture/>}
            </div>
            <input type="file" id='imgUpload' onChange={handleUploadChange}/>
            <label htmlFor='imgUpload' title='Upload an image. Max size: 5Mb'>{<IconContainer icon={<RiImageEditFill className='icon'/>}/>}</label>
          </div>
          <h1>{userInfo.first_name} {userInfo.last_name}</h1>
          <div className='header-container'>
            {userInfo.header
            ? <>
                <UserHeader readOnly={readOnly} setReadOnly={setReadOnly} header={header} setHeader={setHeader}/>
                {readOnly  && <IconContainer icon={<RiEditLine className='icon'/>} onClick={toggleReadOnly} title="Edit header"/>}
                {!readOnly && <IconContainer icon={<FiCheck className='icon green'/>} onClick={() => handleSaveHeader(header.trim())} title="Save changes"/>}
              </>
            : <>
                {headerModal
                ? <div className='header-modal'>
                    <p>Enhance you profile</p>
                    <button className='btn white' onClick={closeHeaderModal}>Add a header</button>
                  </div>
                : <>
                    <UserHeader readOnly={readOnly} setReadOnly={setReadOnly} header={header} setHeader={setHeader}/>
                    {readOnly  && <IconContainer icon={<RiEditLine className='icon'/>} onClick={toggleReadOnly} title="Edit header"/>}
                    {!readOnly && <IconContainer icon={<FiCheck className='icon green'/>} onClick={() => handleSaveHeader(header.trim())} title="Save changes"/>}
                  </>
                }
              </>
              }
          </div>
        </>
        : <Spinner/>}
      </div>
    </>
  )
}

export default Profile;