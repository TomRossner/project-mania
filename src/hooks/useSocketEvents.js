import { useEffect } from 'react';
import { socket } from '../utils/socket';

const useSocketEvents = ({events}) => {

    useEffect(() => {
        
        socket.connect();

        socket.on('connect', () => {
            console.log('Connected');
        })
        
        // return () => {
        //     socket.disconnect();
        // };

    }, []);
    
    useEffect(() => {
        Object.entries(events).forEach(([event, handler]) => {
            socket.on(event, handler);
        });

        // return () => {
        //     Object.entries(events).forEach(([event, handler]) => {
        //         socket.off(event, handler);
        //     });
        // }
    }, [events]);
}

export default useSocketEvents;