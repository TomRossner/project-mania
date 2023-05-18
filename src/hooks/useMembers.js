import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMembers } from '../store/members/members.selector';
import { fetchMembersAsync } from '../store/members/members.actions';
import { selectTargetUser } from '../store/globalStates/globalStates.selector';

const useMembers = () => {
    const members = useSelector(selectMembers);
    const dispatch = useDispatch();
    const targetUser = useSelector(selectTargetUser);


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