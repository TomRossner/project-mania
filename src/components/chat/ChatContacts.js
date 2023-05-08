import React, {Suspense, useEffect, useState} from 'react';
import Spinner from '../common/Spinner';
import IconContainer from '../common/IconContainer';
import { BsChatLeftTextFill } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectChats, selectContacts, selectFavorites } from '../../store/chat/chat.selectors';
import Chat from './Chat';
import useSocketEvents from '../../hooks/useSocketEvents';
import useChat from '../../hooks/useChat';

const ChatContacts = () => {
    const {userInfo} = useAuth();
    const chats = useSelector(selectChats);
    const contacts = useSelector(selectContacts);
    const [typingStates, setTypingStates] = useState({});
    const {fetchUserChats, sortChats} = useChat();
    const favorites = useSelector(selectFavorites);

    // Listen to socket events
    useSocketEvents({
        events: {
            typing: ({chatId}) => {
                setTypingStates({...typingStates, [chatId]: true,});
            },
            notTyping: ({chatId}) => {
                setTypingStates({...typingStates, [chatId]: false,});
            },
        },
    });

    // Fetch user chats
    useEffect(() => {
        if (!contacts.length) return;
        
        // Fetching user chats
        if (userInfo) fetchUserChats();

    }, [contacts, favorites]);

  return (
      <div className='chat-contacts'>

            <div className='chat-title'>
                <IconContainer icon={<BsChatLeftTextFill className='icon small blue'/>}/>
                <h3>Chats</h3>
            </div>

            <Suspense fallback={<Spinner/>}>
                {chats?.length
                    ? sortChats(chats).map(chat => {
                        return (
                            <Chat
                                key={chat._id}
                                contactId={chat.users?.find(uid => uid !== userInfo?._id)}
                                messages={chat.messages}
                                isTyping={typingStates[chat._id]}
                            />
                        )
                    })
                    : null
                }
            </Suspense>

        </div>
  )
}

export default ChatContacts;