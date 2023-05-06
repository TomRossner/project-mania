import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Spinner from './common/ButtonSpinner';
import BlankProfilePicture from "./common/BlankProfilePicture";
import IconContainer from './common/IconContainer';
import {RiImageEditFill, RiEditLine} from "react-icons/ri";
import UserHeader from './UserHeader';
import {FiCheck} from "react-icons/fi";
import { updateUser, updateProfilePicture, updateUserPW, checkPassword } from '../httpRequests/http.auth';
import { useDispatch } from 'react-redux';
import { fetchUserInfoAsync } from '../store/userInfo/userInfo.actions';
import HeaderModal from './HeaderModal';
import useProject from '../hooks/useProject';
import { PATTERN_TYPES, checkPattern } from '../utils/regex';
import { ERROR_MESSAGES } from '../utils/errors';
import Input from './common/Input';

const Profile = () => {
  const {
    user,
    userInfo,
    profileImage,
    userName,
    setProfileImage,
    loadProfileImage
  } = useAuth();
  const [readOnly, setReadOnly] = useState(true);
  const [header, setHeader] = useState("");
  const [headerModal, setHeaderModal] = useState(true);
  const dispatch = useDispatch();
  const headerRef = useRef();
  const [inputTypePassword, setInputTypePassword] = useState(true);
  const [userData, setUserData] = useState({
    email: userInfo?.email,
    newPassword: '',
    currentPassword: ''
  });
  const {showError} = useProject();

  const toggleReadOnly = () => setReadOnly(!readOnly);

  const handleInputChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const handleSaveNewPassword = async (currentPW, newPW) => {
    try {
      // Check if currentPW matches user's password
      await checkPassword(userInfo._id, currentPW);

      // Check newPW regex pattern
      if (!checkPattern(PATTERN_TYPES.PASSWORD, newPW)) {
        showError(ERROR_MESSAGES.INVALID_PASSWORD_FORMAT);
        return;
      }

      // Update password in DB
      return await updateUserPW(userInfo._id, newPW);

    } catch ({response}) {
      if (response.data.error && response.status === 400) {
        showError(response.data.error);
      } else showError(response.data.error);
    }
  }


  const handleSaveHeader = async (header) => {
    if (!header.length) setHeaderModal(true);

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
      const {data: compressedImg} = await updateProfilePicture({
        email: userInfo.email,
        imgData: base64EncodedFile
      });
      setProfileImage(Buffer.from(compressedImg));
      dispatch(fetchUserInfoAsync(user._id || user.user_id));
    }
  }

  const closeHeaderModal = () => {
    setHeaderModal(false);
    setReadOnly(false);
  }

  // Refresh profile image
  useEffect(() => {
    if (!userInfo) return;

    loadProfileImage();

  }, [userInfo]);

  return (
    <>
      <div className='profile-container'>
        {userInfo ?
        <>
          <div className='img-container'>
            <div className='profile-img-container'>
              {profileImage
                ? <img src={profileImage} alt="profile"/>
                : <BlankProfilePicture/>
              }
            </div>
            <input type="file" id='imgUpload' accept="image/png, image/jpeg" onChange={handleUploadChange}/>
            <label htmlFor='imgUpload' title='Upload an image. JPEG/PNG only. Max size: 5Mb'>
              <IconContainer icon={<RiImageEditFill className='icon'/>}/>
            </label>
          </div>
          <h1>{userName}</h1>
          <div className='header-container'>
            {userInfo?.header
            ? <>
                {headerModal
                ? <HeaderModal closeHeaderModal={closeHeaderModal}/>
                : <>
                    <UserHeader readOnly={readOnly} setReadOnly={setReadOnly} header={header} setHeader={setHeader}/>
                    {readOnly && <IconContainer icon={<RiEditLine className='icon'/>} onClick={toggleReadOnly} title="Edit header"/>}
                    {!readOnly && <IconContainer icon={<FiCheck className='icon green'/>} onClick={() => handleSaveHeader(header.trim())} title="Save changes"/>}
                    <UserHeader
                      readOnly={readOnly}
                      setReadOnly={setReadOnly}
                      header={header}
                      setHeader={setHeader}
                      handleSaveHeader={handleSaveHeader}
                      toggleReadOnly={toggleReadOnly}
                    />
                  </>
                }
              </>
            : <>
                {headerModal
                ? <HeaderModal closeHeaderModal={closeHeaderModal}/>
                : <>
                    <UserHeader readOnly={readOnly} setReadOnly={setReadOnly} header={header} setHeader={setHeader}/>
                    {readOnly && <IconContainer icon={<RiEditLine className='icon'/>} onClick={toggleReadOnly} title="Edit header"/>}
                    {!readOnly && <IconContainer icon={<FiCheck className='icon green'/>} onClick={() => handleSaveHeader(header.trim())} title="Save changes"/>}
                  </>
                }
              </>
              }
          </div>
          <h4>Email address</h4>
          <p>{userInfo?.email}</p>

            <h3>Change password</h3>
            <Input
              type={inputTypePassword ? 'password' : 'text'}
              name='currentPassword'
              text='Current password'
              onChange={handleInputChange}
              value={userData?.currentPassword}
            />
            <Input
              type='password'
              name='newPassword'
              text='New password'
              onChange={handleInputChange}
              value={userData?.newPassword}
            />
            <button
              type='button'
              className='btn blue'
              onClick={() => handleSaveNewPassword(userData?.currentPassword, userData?.newPassword)}
            >Save</button>

            <p>Member since <span>{new Date(userInfo?.created_at).toLocaleDateString()}</span></p>
        </>
        : <Spinner/>}
      </div>
    </>
  )
}

export default Profile;