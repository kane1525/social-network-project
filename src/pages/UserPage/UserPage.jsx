import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as WithoutAvatar } from '../../assets/Group.svg';
import { setCurrentUserPageThunk } from '../../store/usersSlice';
import { followThunk } from '../../store/authSlice';
import PostPopUp from '../../components/PostPopUp';
import Popup from '../../components/PopUp';
import AddPostForm from '../../components/Forms/AddPostForm';
import PageContainer from '../../layouts/PageContainer';
import PostPage from '../../components/PostPage';
import './style.css';

const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const user = useSelector((state) => state.users.currentUserPage);
  const isLoading = useSelector((state) => state.users.isLoading);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const isFollow = authUser.following.find((user) => user.id === id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUserPageThunk(id));
  }, []);

  function handleFollowClick() {
    dispatch(followThunk(id));
  }

  if (isLoading) {
    return '...loading';
  }

  return (
    <PageContainer className="user-page">
      <div className="user-page__header">
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <WithoutAvatar />
        )}
        <div className="user-page__rigth-part">
          <div className="user-page__info">
            <p>
              <span className="bold">{user.posts.length}</span> posts
            </p>
            <p>
              <span className="bold">{user.followersCount}</span> followers
            </p>
            <p>
              <span className="bold">{user.followingsCount}</span> followings
            </p>
          </div>
          {authUser.id !== id &&
            (isFollow ? (
              <button onClick={handleFollowClick} className="unfollow">
                Unfollow
              </button>
            ) : (
              <button onClick={handleFollowClick} className="follow">
                Follow
              </button>
            ))}
          {authUser.id === id && (
            <div className="profile-btns-wrapper">
              <Popup
                buttonText="Add post"
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
              >
                <AddPostForm setIsPopupOpen={setIsPopupOpen} />
              </Popup>
              <button
                onClick={() => {
                  navigate('/settings');
                }}
                className="profile-control-btn"
              >
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="user-page__line"></div>
      <div className="user-page__posts">
        {user.posts.map((post) => {
          return (
            <PostPopUp src={post.imgUrl} key={post._id}>
              <PostPage post={post} user={user} />
            </PostPopUp>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default UserPage;
