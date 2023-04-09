import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../api/api';
import { setUsers } from '../store/usersSlice';
import { toggleFollow } from '../api/api';
import { toggleUiFollow } from '../store/usersSlice';
import NotFound from '../components/NotFound';

const User = ({ user }) => {
  const dispatch = useDispatch();

  function handleFollowClick(id) {
    toggleFollow(id).then(() => {
      dispatch(toggleUiFollow(id));
    });
  }

  return (
    <div className="user-card">
      <img src={user.avatar || 'assets/Group.svg'} alt="avatar" />
      <Link to={`/user/${user._id}`}>{user.login}</Link>
      {user.isFollow ? (
        <button
          onClick={() => handleFollowClick(user._id)}
          className="unfollow"
        >
          Unfollow
        </button>
      ) : (
        <button onClick={() => handleFollowClick(user._id)} className="follow">
          Follow
        </button>
      )}
    </div>
  );
};

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersToShow);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((res) => {
      dispatch(setUsers(res));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!users.length) {
    return (
      <div className="not-found">
        <NotFound />
        <p>Users not found</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Users;
