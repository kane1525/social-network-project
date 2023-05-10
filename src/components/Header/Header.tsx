import { BiLogOut, BiSearchAlt, BiUser } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/store";

import { logout } from "../../redux/auth/authSlice";
import { authUserSelector } from "../../redux/auth/selectors";
import { usersSelector } from "../../redux/users/selectors";
import { changeSearchValue } from "../../redux/users/usersSlice";

import "./style.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authUser = useSelector(authUserSelector);
  const {
    searchValue,
    isLoading,
    currentUserPage: currentUser,
    usersToShow,
  } = useSelector(usersSelector);

  const foundUsersLenth = usersToShow.length;

  function handleLogOut() {
    dispatch(logout());
    navigate("/login");
  }

  function handleHomePageClick() {
    navigate(`/user/${authUser?.id}`);
  }

  function handleUsersPageClick() {
    navigate(`/users`);
  }

  const headerText = (function (): string {
    if (location.pathname === "/") {
      return "Home";
    } else if (location.pathname.includes("/users")) {
      if (searchValue.length === 0) {
        return "Users";
      } else if (foundUsersLenth) {
        return foundUsersLenth + " users found";
      } else {
        return "we cannot find such users";
      }
    } else if (location.pathname.includes("/user/")) {
      return isLoading
        ? "...loading"
        : currentUser?.login
        ? currentUser.login
        : "no login";
    } else if (location.pathname.includes("settings")) {
      return "Settings";
    }
    return "Header";
  })();

  return (
    <div className="header-wrapper">
      <header className="header">
        {location.pathname.includes("/users") && (
          <div className="header__search-box">
            <BiSearchAlt className="header__search-icon" color="black" />
            <input
              onChange={(e) => {
                dispatch(changeSearchValue(e.target.value));
              }}
              type="text"
              placeholder="Search"
              className="header__search-input"
            />
          </div>
        )}
        {(location.pathname.includes("/user/") ||
          location.pathname.includes("/settings")) && (
          <button
            className="header__back-btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            back
          </button>
        )}
        <span className="header__text">{headerText}</span>
        <div className="header__icons">
          <button onClick={handleUsersPageClick} className="header__icon-btn">
            <FiUsers className="header__icon" />
          </button>
          <button onClick={handleHomePageClick} className="header__icon-btn">
            <BiUser className="header__icon" />
          </button>
          <button onClick={handleLogOut} className="header__icon-btn">
            <BiLogOut className="header__icon" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
