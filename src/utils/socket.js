import io from "socket.io-client";

// const url = 'http://tomrossner.dev';
const url = 'http://localhost:5000';

export const socket = io(url, {
    transports: ['websocket', 'polling'],
    // secure: true,
    // rejectUnauthorized: false,
    allowEIO3: true
});