import React, { Suspense, useEffect, useState } from 'react';
import IconContainer from '../common/IconContainer';
import { BsStarFill } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorites, setFavoritesChats } from '../../store/chat/chat.actions';
import { selectFavorites, selectFavoritesChats } from '../../store/chat/chat.selectors';
import Chat from './Chat';
import useSocketEvents from '../../hooks/useSocketEvents';
import Spinner from '../common/Spinner';

const ChatFavorites = () => {
  const favorites = useSelector(selectFavorites);
  const {userInfo} = useAuth();
  const dispatch = useDispatch();
  const [typingStates, setTypingStates] = useState({});
  const favoritesChats = useSelector(selectFavoritesChats);

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

  useEffect(() => {
    if (!userInfo) return;
    dispatch(setFavorites([...userInfo?.favorites]));
  }, [userInfo]);

  useEffect(() => {
    if (!favorites.length && favoritesChats.length) {
      dispatch(setFavoritesChats([]));
      return;
    }

  }, [favorites]);


  return (
    <div className='favorites-container'>

        <div className='chat-title'>
          <IconContainer icon={<BsStarFill className='icon star'/>}/>
          <h3>Favorites</h3>
        </div>

        <Suspense fallback={<Spinner/>}>
          <div className='favorites'>
            {favoritesChats?.length
              ? <>
                {favoritesChats?.map(favChat => {
                  return (
                    <Chat
                        key={favChat?._id}
                        contactId={favChat?.users.find(uid => uid !== userInfo?._id)}
                        messages={favChat?.messages}
                        isTyping={typingStates[favChat?._id]}
                    />
                  )
                })}
                </>
              : null
            }
          </div>
        </Suspense>
        
    </div>
  )
}

export default ChatFavorites;