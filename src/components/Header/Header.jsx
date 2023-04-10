import { useLocation, useNavigate } from 'react-router-dom';
import { BiSearchAlt, BiLogOut, BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { changeSearchValue } from '../../store/usersSlice';
import './style.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const foundUsersLenth = useSelector(
    (state) => state.users.usersToShow.length
  );
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
      return isLoading ? '...loading' : currentUser?.login;
    } else if (location.pathname.includes('settings')) {
      return 'Settings';
    }
    return 'Header';
  })();

  return (
    <header className="header">
      {location.pathname.includes('/users') && (
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
      {(location.pathname.includes('/user/') ||
        location.pathname.includes('/settings')) && (
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
        <button onClick={handleHomePageClick} className="header__icon-btn">
          <BiUser className="header__icon" />
        </button>
        <button onClick={handleLogOut} className="header__icon-btn">
          <BiLogOut className="header__icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
