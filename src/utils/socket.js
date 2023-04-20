import io from "socket.io-client";

const url = 'http://tomrossner.dev';
// const url = 'http://localhost:5000';

export const socket = io("https://tomrossner.dev", {
    transports: ['polling'],
    secure: true,
    rejectUnauthorized: false,
    allowEIO3: true
});