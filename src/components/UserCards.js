import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import IconContainer from './common/IconContainer';
import LabelsContainer from './common/LabelContainer';

const UserCards = () => {
    const {user, isAuthenticated} = useAuth();
  return (
    <nav>
        <div className='right-nav-content user-card'>
            <div className='profile-img-container'>
                {/* <img src='' alt='profile'></img> */}
                <IconContainer additionalClass="big" icon={<BsPersonCircle className='icon'/>}/>
            </div>
            <LabelsContainer content={isAuthenticated ? "ONLINE" : "OFFLINE"} additionalClass={`${isAuthenticated ? "green-bg green" : "red-bg red"} no-hover`}></LabelsContainer>
            {/* <h3>{user?.first_name} {user?.last_name}</h3> */}
            <div className='buttons-container'>
                <button className='btn white'>View profile</button>
                <button className='btn white'>Message</button>
            </div>
        </div>
    </nav>
  )
}

export default UserCards;