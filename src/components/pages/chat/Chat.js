import React, { useEffect, useState } from 'react';
import ProfilePicture from '../../common/ProfilePicture';
import Space from '../../common/Space';
import useAuth from '../../../hooks/useAuth';
import useChat from '../../../hooks/useChat';
import { useDispatch } from 'react-redux';
import { setChatSideBarOpen, setCurrentContact } from '../../../store/chat/chat.actions';
import BlankProfilePicture from '../../common/BlankProfilePicture';
import IconContainer from '../../common/IconContainer';
import {MdDoneAll} from "react-icons/md";
import { AM_PM } from '../../../utils/timeFormats';
import { fetchChatAsync } from '../../../store/chat/chat.actions';

const Chat = ({contactId, messages, isTyping}) => {
    const {getContactInfo} = useChat();
    const {userInfo} = useAuth();
    const dispatch = useDispatch();
    const [lastMessage, setLastMessage] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState(0);
    const [contact, setContact] = useState(null);

    // Load chat
    const loadChat = async (userId, contactId) => {
      const contact = await getContactInfo(contactId);
      dispatch(setCurrentContact(contact));
      dispatch(fetchChatAsync(userId, contactId));
    }

    // Handle chat click
    const handleChatClick = async (contactId) => {
      loadChat(userInfo?._id, contactId);
      dispatch(setChatSideBarOpen(false));
    }

    // Set last message and unseen messages
    useEffect(() => {
      if (!messages?.length) return;
      setLastMessage(messages[messages.length - 1]);
      setUnseenMessages(messages.filter(msg => msg.seen === false && msg.from !== userInfo?._id).length);
    }, [messages]);

    // Refresh contact
    const refreshContact = async (contactId) => {
        const contact = await getContactInfo(contactId);
        setContact(contact);
    }

    // Load contact
    useEffect(() => {
      refreshContact(contactId);
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
          <span className='last-time-message-sent'>{lastMessage?.sent_at ? AM_PM(lastMessage?.sent_at) : null}</span>
          <p className='last-message'>
            {isTyping
              ? <span className='typing green'>typing...</span>
              : <>
                  {lastMessage?.from === userInfo?._id
                    ? <>
                        {lastMessage?.seen === true
                          ? <><IconContainer icon={<MdDoneAll className='icon green'/>}/>{lastMessage?.text}</>
                          : <><IconContainer icon={<MdDoneAll className='icon'/>}/>{lastMessage?.text}</>
                        }
                      </>
                    : lastMessage?.text
                  }
                </>
            }
            
          </p>
          <Space/>
          {/* {lastMessage?.seen === false && unseenMessages
            ? 
              <div className='unseen-messages-count-container'>
                <span className='unseen-messages-count'>{unseenMessages}</span>
              </div>
            : null
          } */}
        </div>
    </div>
  )
}

export default Chat;