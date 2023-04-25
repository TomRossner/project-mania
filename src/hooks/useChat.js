import { useState } from 'react';
import useAuth from './useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat, selectCurrentChat, selectCurrentContact } from '../store/chat/chat.selectors';
import { getMembers, createChat, getUserById } from '../httpRequests/http.members';
import { fetchChatAsync, setChat } from '../store/chat/chat.actions';
import { socket } from '../utils/socket';

const useChat = () => {
    const {user} = useAuth();
    const currentChat = useSelector(selectCurrentChat);
    const currentContact = useSelector(selectCurrentContact);
    const [contacts, setContacts] = useState([]);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const {error} = useSelector(selectChat);


    // Socket callbacks
    const handleReceiveMessage = (message) => {
        setMessages([...messages, message]);
    }

    // Socket emitters
    const handleSendMessage = (message) => {

        const newMessage = {
            ...message,
            chatId: currentChat._id,
            target_socket_id: currentContact.socket_id
        }

        socket.emit('message', newMessage);
    }


    // Socket handlers
    socket.on('receive-message', handleReceiveMessage);








    const loadContacts = async () => {
        const contacts = await getMembers();
        setContacts(contacts.filter(c => c._id !== user?._id));
    }

    const loadChat = (ids) => {
        dispatch(fetchChatAsync(ids));
    }

    const createNewChat = async (userId, contactId) => {
        const newChat = await createChat({userId, contactId});
        dispatch(setChat(newChat));
    }

    const getContactInfo = async (contactId) => {
        const contactInfo = await getUserById(contactId);
        return contactInfo;
    }

  return {
    currentChat,
    contacts,
    messages,
    error,
    currentContact,
    loadChat,
    createNewChat,
    setMessages,
    getContactInfo,
    loadContacts,
    handleSendMessage
  }
}

export default useChat;