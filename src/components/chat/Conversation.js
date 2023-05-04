import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, selectFavorites } from '../../store/chat/chat.selectors';
import Spinner from '../common/Spinner';
import useChat from '../../hooks/useChat';
import Line from '../common/Line';
import ChatMessage from './ChatMessage';
import { generateKey } from '../../utils/keyGenerator';
import { API_URL, notifyIsNotTyping, notifyIsTyping, socket } from '../../utils/socket';
import ProfilePicture from '../common/ProfilePicture';
import BlankProfilePicture from '../common/BlankProfilePicture';
import { setCurrentContact, setFavorites } from '../../store/chat/chat.actions';
import useSocketEvents from '../../hooks/useSocketEvents';
import Space from '../common/Space';
import IconContainer from '../common/IconContainer';
import { RiUserStarLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { lastSeenTime } from '../../utils/timeFormats';
import { updateUser } from '../../httpRequests/http.auth';
import useAuth from '../../hooks/useAuth';
import { setUserInfo } from '../../store/userInfo/userInfo.actions';

const Conversation = () => {
    const {currentContact, messages, currentChat, setMessages, getContactInfo} = useChat();
    const [contactName, setContactName] = useState('');
    const dispatch = useDispatch();
    const messagesBottomRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const {userInfo} = useAuth();
    const favorites = useSelector(selectFavorites);

    useSocketEvents({
        events: {
            typing: () => setIsTyping(true),
            notTyping: () => setIsTyping(false)
        }
    })

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

    // useEffect(() => {
    //     if (!currentContact) return;
    //     console.log(currentContact);
    // }, [currentContact]);

    // Scroll to last message
    const scrollToBottom = () => {
        messagesBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    // Scroll to last message
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAddToFavorites = async (contactId) => {
        if (favorites.some(favId => favId === contactId)) {
            // Remove from favorites
            console.log(`Removing ${contactId} from favorites`);

            await updateUser({
                ...userInfo,
                favorites: [...userInfo.favorites.filter(favId => favId !== contactId)]
            });

            dispatch(setFavorites([...favorites.filter(favId => favId !== contactId)]));

        } else {
            // Add to favorites
            console.log(`Adding ${contactId} to favorites`);

            await updateUser({
                ...userInfo,
                favorites: [...userInfo.favorites, contactId]
            });

            dispatch(setFavorites([...favorites, contactId]));
        }
    }

    // useEffect(() => {
    //     if (!userInfo) return;
    //     console.log(userInfo?.favorites);
    // }, [userInfo]);

  return (
    <div className='conversation-container'>
        {contactName &&
            <div className='profile'>
                {currentContact?.base64_img_data || currentContact?.img_url
                    ? <ProfilePicture src={currentContact?.base64_img_data || currentContact?.img_url}/>
                    : <BlankProfilePicture/>
                }
                <div>
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
                <button className='btn white'>
                    <IconContainer icon={<AiOutlineUser className='icon xl'/>}/>
                    View profile
                </button>
            </div>
        }

        <Line/>
        <div className='conversation'>
            {messages?.length ? messages?.map(msg => {
                return <ChatMessage key={generateKey()} msg={msg} currentContact={currentContact}/>
            }) : null}
            <div className='messages-bottom' ref={messagesBottomRef}>
                {isTyping ? <p className='typing'>{currentContact?.first_name} is typing...</p> : null}
            </div>
        </div>
    </div>
  )
}

export default Conversation;