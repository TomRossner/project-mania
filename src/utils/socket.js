import io from "socket.io-client";

// const url = 'http://tomrossner.dev';
export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://tomrossner.dev';

// Connect socket
export const socket = io(API_URL, {
    transports: ['websocket', 'polling'],
    allowEIO3: true
});

// Emit connection
export const emitOnline = (userName, userId) => {
    socket.emit('connection', {userName, userId});
}

// Emit disconnection
export const emitCloseBrowser = () => {
    socket.emit('closeBrowser');
}

// Notify contact is typing
export const notifyIsTyping = (chatId, targetSocketId) => {
    socket.emit('typing', {chatId, targetSocketId});
}

// Notify contact is not typing
export const notifyIsNotTyping = (chatId, targetSocketId) => {
    socket.emit('notTyping', {chatId, targetSocketId});
}

// Send message
export const sendMessage = (message) => {
    socket.emit('newMessage', message);
}

// Update 'seen' property
export const updateIsSeen = (messageId, targetSocketId) => {
    socket.emit('seen', {messageId, targetSocketId});
}

// // Emit online
// export const emitIsOnline = (userId, userName) => {
//     socket.emit('online', {userId, userName});
// }

// Emit offline
// export const emitIsOffline = (userId, userName) => {
//     socket.emit('offline', {userId, userName});
// }

// Emit created chat
export const emitCreateChat = (userId, targetSocketId, newChat) => {
    socket.emit('createChat', {
        userId,
        targetSocketId,
        newChat
    });
}