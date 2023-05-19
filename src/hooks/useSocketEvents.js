import { useEffect } from 'react';
import { socket } from '../utils/socket';

const useSocketEvents = ({events}) => {

    useEffect(() => {
        socket.connect();
        
        // return () => {
        //     socket.disconnect();
        // }; // Messes up socket.id

    }, []);
    
    useEffect(() => {
        Object.entries(events).forEach(([event, handler]) => {
            socket.on(event, handler);
        });

        return () => {
            Object.entries(events).forEach(([event, handler]) => {
                socket.off(event, handler);
            });
        }
    }, [events]);
}

export default useSocketEvents;