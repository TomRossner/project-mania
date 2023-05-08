import { useEffect } from 'react';
import { socket } from '../utils/socket';

const useSocketEvents = ({events}) => {

    useEffect(() => {
        socket.connect();
        
        // return () => {
        //     socket.disconnect();
        // };

    }, []);
    
    useEffect(() => {
        Object.entries(events).forEach(([event, handler]) => {
            socket.on(event, handler);
        });
    }, [events]);
}

export default useSocketEvents;