import React from 'react';
import ProfilePicture from './common/ProfilePicture';
import Space from './common/Space';
import useAuth from '../hooks/useAuth';
import { getChat, createChat } from '../httpRequests/http.members';

const Contact = ({contact}) => {
    const {base64_img_data, image_url, first_name, last_name, _id} = contact;
    const {user} = useAuth();

    const loadChat = async (userId, contactId) => {
      const chat = await getChat({userId, contactId});
      console.log(chat);
    }

    const createNewChat = async (userId, contactId) => {
      const newChat = await createChat({userId, contactId});
      console.log(newChat);
    }

  return (
    <div
      className='contact'
      // onClick={() => loadChat(user?._id, contact._id)}
      onDoubleClick={() => createNewChat(user?._id, contact._id)}
    >
        <div className='contact-image'>
            <ProfilePicture src={base64_img_data || image_url}/>
        </div>

        <div className='contact-content'>
            <h3 className='contact-name'>{first_name} {last_name}</h3>
            <span className='last-time-message-sent'>04:18 PM</span>
            <p className='last-message'>I said hello so say it back</p>
            <Space/>
            <div className='unseen-messages-count-container'>
              <span className='unseen-messages-count'>14</span>
            </div>
        </div>
    </div>
  )
}

export default Contact;