import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getUsers } from "../api/api";
import { toggleFollow } from "../api/api";
import { ReactComponent as WithoutAvatar } from "../assets/Group.svg";
import { ReactComponent as NotFound } from "../assets/not-found.svg";
import PageContainer from "../layouts/PageContainer";
import { followThunk } from "../redux/auth/asyncActions";
import { authUserSelector } from "../redux/auth/selectors";
import { usersSelector } from "../redux/users/selectors";
import { setUsers } from "../redux/users/usersSlice";
import { toggleUiFollow } from "../redux/users/usersSlice";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);

  const isFollow = authUser.following.find((u) => u.id === user._id);

  function handleFollowClick() {
    dispatch(followThunk({ userId: user._id }));
  }

  return (
    <div className="user-card">
      {user.avatar ? <img src={user.avatar} alt="avatar" /> : <WithoutAvatar />}
      <Link to={`/user/${user._id}`}>{user.login}</Link>
      {isFollow ? (
        <button onClick={() => handleFollowClick()} className="unfollow">
          Unfollow
        </button>
      ) : (
        <button onClick={() => handleFollowClick()} className="follow">
          Follow
        </button>
      )}
    </div>
  );
};

const UsersPage = () => {
  const dispatch = useDispatch();
  const { usersToShow: users } = useSelector(usersSelector);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((res) => {
      dispatch(setUsers(res));
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
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
    <PageContainer>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </PageContainer>
  );
};

export default UsersPage;
