import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../store/chat/chat.selectors';
import useChat from '../../hooks/useChat';
import Line from '../common/Line';
import ChatMessage from './ChatMessage';
import { generateKey } from '../../utils/keyGenerator';
import ProfilePicture from '../common/ProfilePicture';
import BlankProfilePicture from '../common/BlankProfilePicture';
import { setChat, setFavorites } from '../../store/chat/chat.actions';
import useSocketEvents from '../../hooks/useSocketEvents';
import Space from '../common/Space';
import IconContainer from '../common/IconContainer';
import { AiOutlineUser } from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { lastSeenTime } from '../../utils/timeFormats';
import { updateUser } from '../../httpRequests/http.auth';
import useAuth from '../../hooks/useAuth';
import { setTargetUser, setUserProfileOpen } from '../../store/globalStates/globalStates.actions';

const Conversation = () => {
    const {currentContact, messages, currentChat, setMessages} = useChat();
    const [contactName, setContactName] = useState('');
    const dispatch = useDispatch();
    const messagesBottomRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const {userInfo} = useAuth();
    const favorites = useSelector(selectFavorites);

    // Listen to socket events
    useSocketEvents({
        events: {
            typing: () => setIsTyping(true),
            notTyping: () => setIsTyping(false)
        }
    });

    const handleViewProfile = (user) => {
        // Set targetUser
        dispatch(setTargetUser(user));
    
        // Open user profile
        dispatch(setUserProfileOpen(true));
    }

    // Handle add to favorites
    const handleAddToFavorites = async (contactId) => {
        if (favorites.some(favId => favId === contactId)) {
            // Remove from favorites

            await updateUser({
                ...userInfo,
                favorites: [...userInfo.favorites.filter(favId => favId !== contactId)]
            });

            dispatch(setFavorites([...favorites.filter(favId => favId !== contactId)]));

        } else {
            // Add to favorites

            await updateUser({
                ...userInfo,
                favorites: [...userInfo.favorites, contactId]
            });

            dispatch(setFavorites([...favorites, contactId]));
        }
    }

    // Set contact name
    useEffect(() => {
        if (!currentContact) return setContactName('');
        setContactName(`${currentContact.first_name} ${currentContact.last_name}`);
    }, [currentContact]);

    // Refresh messages
    useEffect(() => {
        if (!currentChat) return;
        dispatch(setMessages([...currentChat?.messages]));
    }, [currentChat]);

    // Scroll to last message
    useEffect(() => {
        const scrollToBottom = () => {
            messagesBottomRef.current.scrollIntoView({ behavior: "smooth" });
        }

        scrollToBottom();
    }, [messages]);

    // Update message's seen property
    useEffect(() => {
        if (currentChat?.messages?.some(msg => msg.seen === false)) {
            dispatch(setChat({
                ...currentChat,
                messages: [...currentChat?.messages?.map(msg => {
                    if (msg.seen === false) {
                        return {...msg, seen: true};
                    } else return msg;
            })]}));
        }
    }, []);

  return (
    <div className='conversation-container'>
        {contactName &&
            <div className='profile'>
                {currentContact?.base64_img_data || currentContact?.img_url
                    ? <ProfilePicture src={currentContact?.base64_img_data || currentContact?.img_url}/>
                    : <BlankProfilePicture/>
                }
                <div className='contact-name'>
                    <h3>{contactName}</h3>
                    {currentContact?.online === true
                        ? <p className='green'>online</p>
                        : <p>last seen {lastSeenTime(currentContact?.last_seen)}</p>
                    }
                </div>
                <Space/>
                <button className='btn' title='Add to favorites' onClick={() => handleAddToFavorites(currentContact?._id)}>
                    <IconContainer icon={<BsStarFill className={favorites.includes(currentContact?._id) ? 'icon star' : 'icon'}/>}/>
                </button>
                <button className='btn white' title='View profile' onClick={() => handleViewProfile(currentContact)}>
                    <IconContainer icon={<AiOutlineUser className='icon xl'/>}/>
                    <span className='text'>View profile</span>
                </button>
            </div>
        }

        <Line/>
        <div className='conversation'>
            {messages?.length ? messages?.map(msg => {
                return <ChatMessage key={generateKey()} msg={msg} currentContact={currentContact}/>
            }) : null}
            <div>
                {isTyping ? <p className='typing'>{currentContact?.first_name} is typing...</p> : null}
            </div>
            <div className='messages-bottom' ref={messagesBottomRef}></div>
        </div>
    </div>
  )
}

export default Conversation;