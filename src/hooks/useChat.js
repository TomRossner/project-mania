import { useDispatch, useSelector } from 'react-redux';
import { selectChat, selectChats, selectContacts, selectCurrentChat, selectCurrentContact, selectFavorites, selectMessages } from '../store/chat/chat.selectors';
import { getUserById } from '../httpRequests/http.members';
import { fetchContactsAsync, setChat, setCurrentContact, setFavoritesChats, setMessages } from '../store/chat/chat.actions';
import { emitCreateChat, sendMessage } from '../utils/socket';
import {  createChat, getUserChats } from '../httpRequests/http.chat';
import { setChats } from '../store/chat/chat.actions';
import { selectUserInfo } from '../store/userInfo/userInfo.selector';
import useSocketEvents from './useSocketEvents';
import { fetchMembersAsync } from '../store/members/members.actions';

const useChat = () => {
    const userInfo = useSelector(selectUserInfo);
    const currentChat = useSelector(selectCurrentChat);
    const currentContact = useSelector(selectCurrentContact);
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);
    const {error} = useSelector(selectChat);
    const chats = useSelector(selectChats);
    const favorites = useSelector(selectFavorites);

    // Socket event handlers

    // Handle new message event
    const handleReceiveMessage = (data) => {
        if (data.chatId === currentChat._id) {
            dispatch(setMessages([...messages, data]));
        }
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

    // Handle user has connected
    const handleIsOnline = async (data) => {
        if (currentContact && data.userId === currentContact?._id) {
            const contact = await getContactInfo(data.userId);
            dispatch(setCurrentContact(contact));
        }
    }

    // Handle user went offline
    const handleIsOffline = async (data) => {
        if (currentContact && data.userId === currentContact?._id) {
            const contact = await getContactInfo(data.userId);
            dispatch(setCurrentContact(contact));
        }
    }

    useSocketEvents({
        events: {
            newMessage: handleReceiveMessage,
            createChat: handleAddChat,
            online: handleIsOnline,
            offline: handleIsOffline
        }
    })



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

    const sortChats = (chats) => {
        // Filter empty chats
        const chatsToFilter = chats.filter(chat => chat.messages.length > 0);

        // Sort 
        const sortedChats = chatsToFilter.sort((chatA, chatB) => {
            const chatA_latestMessage = chatA.messages[chatA.messages.length - 1];
            const chatB_latestMessage = chatB.messages[chatB.messages.length - 1];

            return new Date(chatA_latestMessage.sent_at) - new Date(chatB_latestMessage.sent_at);
        });

        // Return sorted chats in reversed order
        return sortedChats.reverse();
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
    fetchUserChats,
    sortChats
  }
}

export default useChat;