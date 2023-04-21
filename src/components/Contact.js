import React from 'react';
import ProfilePicture from './common/ProfilePicture';

const Contact = ({contact}) => {
    const {base64_img_data, image_url, first_name, last_name} = contact;
  return (
    <div className='contact'>
        <div className='contact-image'>
            <ProfilePicture src={base64_img_data || image_url}/>
        </div>

        <div className='name-and-last-message'>
            <h3 className='contact-name'>{first_name} {last_name}</h3>
            <p className='last-message'>I said hello so say it back</p>
        </div>
    </div>
  )
}

export default Contact;