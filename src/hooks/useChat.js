import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, selectChats, selectCurrentChat, selectCurrentContact, selectMessages } from '../store/chat/chat.selectors';
import { getMembers, getUserById } from '../httpRequests/http.members';
import { fetchChatAsync, setChat, setMessages } from '../store/chat/chat.actions';
import { sendMessage, socket } from '../utils/socket';
import { getChat, createChat } from '../httpRequests/http.chat';
import { setChats } from '../store/chat/chat.actions';

const useChat = () => {
    const {user, userInfo} = useAuth();
    const currentChat = useSelector(selectCurrentChat);
    const currentContact = useSelector(selectCurrentContact);
    const [contacts, setContacts] = useState([]);
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages);
    const {error} = useSelector(selectChat);
    const chats = useSelector(selectChats);


    // Socket callbacks
    const handleReceiveMessage = (message) => {
        dispatch(setMessages([...messages, message]));
    }

    // Socket emitters
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


    // Socket handlers
    socket.on('new-message', handleReceiveMessage);

    // Load contacts
    const loadContacts = async () => {
        const contacts = await getMembers();
        setContacts(contacts.filter(c => c._id !== user?._id));
    }

    // Load chat
    const loadChat = (userId, contactId) => {
        dispatch(fetchChatAsync(userId, contactId));
    }

    // Create chat
    const createNewChat = async (userId, contactId) => {
        const newChat = await createChat({userId, contactId});
        dispatch(setChat(newChat));
        dispatch(setChats([...chats, newChat]));
    }

    // Get contact details
    const getContactInfo = async (contactId) => {
        const contactInfo = await getUserById(contactId);
        return contactInfo;
    }

    // Fetch chats
    const fetchChats = async () => {
        const updatedChats = [];

        for (let i = 0; i < contacts.length; i++) {
            const chat = await getChat(userInfo?._id, contacts[i]._id);

            if (!chat) i++;

            updatedChats.push(chat);
            i++;
        }

        dispatch(setChats([...updatedChats.filter(chat => chat)]));
    }

    // Fetch chats
    useEffect(() => {
        if (!contacts.length) return;
        fetchChats();
    }, [contacts]);

  return {
    currentChat,
    contacts,
    messages,
    error,
    currentContact,
    chats,
    loadChat,
    createNewChat,
    setMessages,
    getContactInfo,
    loadContacts,
    handleSendMessage
  }
}

export default useChat;