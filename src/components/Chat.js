import React, { useEffect, useState } from 'react';
import ProfilePicture from './common/ProfilePicture';
import Space from './common/Space';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import { useDispatch } from 'react-redux';
import { setCurrentContact } from '../store/chat/chat.actions';
import BlankProfilePicture from './common/BlankProfilePicture';
import IconContainer from './common/IconContainer';
import {MdDoneAll} from "react-icons/md";
import { messageTime } from '../utils/timeFormats';

const Chat = ({contactId, messages}) => {
    const {loadChat, getContactInfo} = useChat();
    const {userInfo} = useAuth();
    const dispatch = useDispatch();
    const [lastMessage, setLastMessage] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState(0);
    const [contact, setContact] = useState(null);

    // Handle chat click
    const handleChatClick = async (contactId) => {
      loadChat(userInfo?._id, contactId);
      dispatch(setCurrentContact(contact));
    }

    // Load contact
    const loadContact = async (contactId) => {
      const contact = await getContactInfo(contactId);
      setContact(contact);
    }

    // Set last message and unseen messages
    useEffect(() => {
      if (!messages.length) return;
      setLastMessage(messages[messages.length - 1]);
      setUnseenMessages(messages.filter(msg => msg.seen === false && msg.from !== userInfo?._id).length);
    }, [messages]);

    // Load contact
    useEffect(() => {
      loadContact(contactId);
    }, []);

  return (
    <div
      className='contact'
      onClick={() => handleChatClick(contactId)}
    >
        <div className='contact-image'>
          {contact?.base64_img_data || contact?.img_url
            ? <ProfilePicture src={contact?.base64_img_data || contact?.img_url}/>
            : <BlankProfilePicture/>
          }
        </div>

        <div className='contact-content'>
          <h3 className='contact-name'>{contact?.first_name} {contact?.last_name}</h3>
          <span className='last-time-message-sent'>{messageTime(lastMessage?.sent_at)}</span>
          <p className='last-message'>
            {lastMessage?.from === userInfo?._id
              ? <>
                  {lastMessage?.seen === true
                    ? <><IconContainer icon={<MdDoneAll className='icon green'/>}/>{lastMessage?.text}</>
                    : <><IconContainer icon={<MdDoneAll className='icon'/>}/>{lastMessage?.text}</>
                  }
                </>
              : lastMessage?.text
            }
          </p>
          <Space/>
          {lastMessage?.seen === false && unseenMessages
            ? 
              <div className='unseen-messages-count-container'>
                <span className='unseen-messages-count'>{unseenMessages}</span>
              </div>
            : null
          }
        </div>
    </div>
  )
}

export default Chat;