import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, selectChats, selectContacts, selectCurrentChat, selectCurrentContact, selectFavorites, selectFavoritesChats, selectMessages } from '../store/chat/chat.selectors';
import { getMembers, getUserById } from '../httpRequests/http.members';
import { fetchChatAsync, fetchContactsAsync, setChat, setCurrentContact, setFavoritesChats, setMessages } from '../store/chat/chat.actions';
import { emitCreateChat, sendMessage, socket } from '../utils/socket';
import { getChat, createChat, getUserChats, addToFavorites, removeFromFavorites } from '../httpRequests/http.chat';
import { setChats } from '../store/chat/chat.actions';
import { setContacts } from '../store/chat/chat.actions';

const useChat = () => {
    const {user, userInfo} = useAuth();
    const currentChat = useSelector(selectCurrentChat);
    const currentContact = useSelector(selectCurrentContact);
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);
    const {error} = useSelector(selectChat);
    const chats = useSelector(selectChats);
    const favorites = useSelector(selectFavorites);
    const favoritesChats = useSelector(selectFavoritesChats);



    // Socket event handlers

    // Handle new message event
    const handleReceiveMessage = (message) => {
        dispatch(setMessages([...messages, message]));
    }

    // Handle send message event
    const handleSendMessage = (chatId, message) => {

        const newMessage = {
            ...message,
            chatId,
            target_socket_id: currentContact.socket_id
        }

        // Send message
        sendMessage(newMessage);

        dispatch(setMessages([...messages, newMessage]));
    }

    // Handle create chat event
    const handleAddChat = (data) => {
        dispatch(setChats([...chats, data.newChat]));
    }



    // Socket handlers
    socket.on('newMessage', handleReceiveMessage);
    socket.on('createChat', handleAddChat);



    // Load contacts
    const loadContacts = async () => {
        dispatch(fetchContactsAsync());
    }

    // Get contact details
    const getContactInfo = async (contactId) => {
        const contactInfo = await getUserById(contactId);
        return contactInfo;
    }

    // Create chat
    const createNewChat = async (userId, contact) => {
        const newChat = await createChat({userId, contactId: contact._id});

        dispatch(setChat(newChat));
        dispatch(setChats([...chats, newChat]));

        emitCreateChat(userInfo._id, contact.socket_id, newChat);
    }

    // Fetch chats
    const fetchUserChats = async () => {

        // Get all user's chats
        const allChats = await getUserChats(userInfo?._id);
        
        const regularChats = allChats.filter(chat => !chat.users.some(uid => favorites.includes(uid)));
        const favoritesChats = allChats.filter(chat => chat.users.some(uid => favorites.includes(uid)));

        dispatch(setChats(regularChats));
        dispatch(setFavoritesChats(favoritesChats));
    }


  return {
    currentChat,
    contacts,
    messages,
    error,
    currentContact,
    chats,
    favorites,
    createNewChat,
    setMessages,
    loadContacts,
    getContactInfo,
    handleSendMessage,
    fetchUserChats
  }
}

export default useChat;