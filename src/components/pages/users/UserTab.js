import React from 'react';
import ProfilePicture from '../../common/ProfilePicture';
import BlankProfilePicture from '../../common/BlankProfilePicture';
import { BsCircleFill } from 'react-icons/bs';
import IconContainer from '../../common/IconContainer';

const UserTab = ({user, onClick, additionalContent}) => {
    const onlineStatusIcon = (user) => {
        return <BsCircleFill className={user.online ? 'icon online-status green' : 'icon online-status grey'}/>
    }

    const checkProfileURL = (user) => {
        return user.base64_img_data ? Buffer.from(user.base64_img_data) : user.img_url.toString();
    }
    
  return (
    <div className='user-tab' onClick={onClick}>
        {user.base64_img_data || user.img_url
            ? <ProfilePicture src={checkProfileURL(user)}/>
            : <BlankProfilePicture/>
        }
        
        <IconContainer title={user.online ? 'Online' : 'Offline'} icon={onlineStatusIcon(user)}/>

        <div className='user-tab-content'>
            <h4>{user.first_name} {user.last_name}</h4>
            {user.header ? <p>{user.header}</p> : null}
        </div>

        <div id='userTabAdditionalContent'>{additionalContent ? additionalContent : null}</div>
    </div>
  )
}

export default UserTab;