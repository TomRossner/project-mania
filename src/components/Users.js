import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../store/auth/auth.selector';
import { selectMembers } from '../store/members/members.selector';
import BackButton from './common/BackButton';
import SearchBar from './common/SearchBar';
import { fetchMembersAsync } from '../store/members/members.actions';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  // const [searchResults, setSearchResults] = useState([]);
  const members = useSelector(selectMembers);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAuthenticated) return navigate("/sign-in");
  }, [])

  useEffect(() => {
    dispatch(fetchMembersAsync());
}, [])

  return (
      <>
      <div className='users-container'>
      <BackButton/>
        <div className='title'>
          <h1>Users</h1>
          <SearchBar placeholderText={"Search users"}/>
        </div>

          <div className='results-container'>
            <p>{members.filter(member => member._id !== user?._id).length} {members.filter(member => member._id !== user?._id).length === 1 ? "user found": "users found"}</p>
            {members?.filter(member => member._id !== user?._id).map(member => {
              return (
                <div key={member._id} className="member">
                  <span>{member.first_name} {member.last_name}</span>
                </div>
              )
            })}
          </div>
      </div>
      </>
  )
}

export default Users;