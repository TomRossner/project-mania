import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMembers } from '../store/members/members.selector';
import { fetchMembersAsync, setMembers } from '../store/members/members.actions';
import { selectTargetUser } from '../store/globalStates/globalStates.selector';
import { setTargetUser } from '../store/globalStates/globalStates.actions';
import useSocketEvents from './useSocketEvents';

const useMembers = () => {
    const members = useSelector(selectMembers);
    const dispatch = useDispatch();
    const targetUser = useSelector(selectTargetUser);

    // Socket events

    // Handle online event
    const handleOnline = (data) => {
      if (members.some(member => member._id === data.userId)) {
        dispatch(setMembers([...members.map(m => {
          if (m._id === data.userId) {
            console.log('Updating online status and socket_id')
            return {...m, online: true, socket_id: data.newSocketId};
          } else return m;
        })]))
      } else if (targetUser && data.userId === targetUser?._id) {
        dispatch(setTargetUser({...targetUser, online: true, socket_id: data.newSocketId}));
      }
    }

    // Handle offline event
    const handleOffline = (data) => {
      if (members.some(member => member._id === data.userId)) {
        dispatch(setMembers([...members.map(m => {
          if (m._id === data.userId) {
            return {...m, online: false};
          } else return m;
        })]))
      } else if (targetUser && data.userId === targetUser?._id) {
        dispatch(setTargetUser({...targetUser, online: false}));
      }
    }

    useSocketEvents({
      events: {
        online: handleOnline,
        offline: handleOffline
      }
    });

    // Fetch all members
    useEffect(() => {
        dispatch(fetchMembersAsync());
    }, []);

  return {
    members,
    targetUser
  }
}

export default useMembers;