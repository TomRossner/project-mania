import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMembers } from '../store/members/members.selector';
import BackButton from './common/BackButton';
import SearchBar from './common/SearchBar';
import { fetchMembersAsync } from '../store/members/members.actions';
import { useNavigate } from 'react-router-dom';
import Line from './common/Line';
import useAuth from '../hooks/useAuth';

const Users = ({setUserCardsActive}) => {
  const members = useSelector(selectMembers);
  const {user, isAuthenticated} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable userCardsActive @ App.js
    setUserCardsActive(false);

    // Fetch all users except current user
    dispatch(fetchMembersAsync());

    // If user is not logged in redirect to sign-in page
    if (!user || !isAuthenticated) navigate("/sign-in");
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
            <Line/>
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