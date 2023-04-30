import io from "socket.io-client";

// const url = 'http://tomrossner.dev';
const API_URL = 'http://localhost:5000';

export const socket = io(API_URL, {
    transports: ['websocket', 'polling'],
    allowEIO3: true
});

// Notify contact is typing
export const notifyIsTyping = (contactId, targetSocketId) => {
    socket.emit('typing', {contactId, targetSocketId});
}

// Notify contact is not typing
export const notifyIsNotTyping = (contactId, targetSocketId) => {
    socket.emit('not-typing', {contactId, targetSocketId});
}

// Send message
export const sendMessage = (message) => {
    socket.emit('new-message', message);
}

// Update 'seen' property
export const updateIsSeen = (messageId, targetSocketId) => {
    socket.emit('seen', {messageId, targetSocketId});
}