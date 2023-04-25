import io from "socket.io-client";

// const url = 'http://tomrossner.dev';
const API_URL = 'http://localhost:5000';

export const socket = io(API_URL, {
    transports: ['websocket', 'polling'],
    // secure: true,
    // rejectUnauthorized: false,
    allowEIO3: true
});