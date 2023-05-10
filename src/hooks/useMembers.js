import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMembers } from '../store/members/members.selector';
import { fetchMembersAsync } from '../store/members/members.actions';

const useMembers = () => {
    const members = useSelector(selectMembers);
    const dispatch = useDispatch();


    // Fetch all members
    useEffect(() => {
        console.log("Fetching members");
        dispatch(fetchMembersAsync());
    }, []);

  return {
    members
  }
}

export default useMembers;