import React from 'react';
import ProfilePicture from './common/ProfilePicture';
import Space from './common/Space';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import { useDispatch } from 'react-redux';
import { setCurrentContact } from '../store/chat/chat.actions';
import BlankProfilePicture from './common/BlankProfilePicture';

const Contact = ({contact}) => {
    const {_id, base64_img_data, img_url, first_name, last_name} = contact;
    const {loadChat, createNewChat} = useChat();
    const {user} = useAuth();
    const dispatch = useDispatch();

    const handleContactClick = async () => {
      loadChat({userId: user?._id, contactId: _id});
      dispatch(setCurrentContact(contact));
    }

  return (
    <div
      className='contact'
      onClick={handleContactClick}
      // onDoubleClick={() => createNewChat(user?._id, contact._id)}
    >
        <div className='contact-image'>
          {base64_img_data || img_url
            ? <ProfilePicture src={base64_img_data || img_url}/>
            : <BlankProfilePicture/>
          }
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