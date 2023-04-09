import React, { useState } from 'react';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import { BiSearchAlt, BiLogOut, BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { changeSearchValue } from '../../store/usersSlice';
import './style.css';

const Layout = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const foundUsersLenth = useSelector(
    (state) => state.users.usersToShow.length
  );
  const allUsers = useSelector((state) => state.users.allUsers);

  const searchValue = useSelector((state) => state.users.searchValue);

  const isLoading = useSelector((state) => state.users.isLoading);
  const currentUser = useSelector((state) => state.users.currentUserPage);
  const authUser = useSelector((state) => state.auth.user);

  function handleLogOut() {
    dispatch(logout());
  }

  function handleHomePageClick() {
    navigate(`/user/${authUser.id}`);
  }

  const headerText = (function () {
    if (location.pathname === '/') {
      return 'Home';
    } else if (location.pathname.includes('/users')) {
      if (searchValue.length === 0) {
        return 'Users';
      } else if (foundUsersLenth) {
        return foundUsersLenth + ' users found';
      } else {
        return 'we cannot find such users';
      }
    } else if (location.pathname.includes('/user/')) {
      // const currentUser = allUsers.find((user) => user._id === params.id);
      return isLoading ? '...loading' : currentUser?.login;
    } else if (location.pathname.includes('settings')) {
      return 'Settings';
    }
    return 'Header';
  })();

  return (
    <>
      <header className="header">
        <div className="header-container">
          {location.pathname.includes('/users') && (
            <div className="search-box">
              <BiSearchAlt className="search-icon" color="black" />
              <input
                onChange={(e) => {
                  dispatch(changeSearchValue(e.target.value));
                }}
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
          )}
          {location.pathname.includes('/user/') && (
            <button
              className="back-btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              back
            </button>
          )}
          <span className="header-text">{headerText}</span>
          <div className="icons">
            <button onClick={handleHomePageClick} className="header-icon-btn">
              <BiUser className="header-icon" />
            </button>
            <button onClick={handleLogOut} className="header-icon-btn">
              <BiLogOut className="header-icon" />
            </button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
