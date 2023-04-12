import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as WithoutAvatar } from "../../assets/Group.svg";
import AddPostForm from "../../components/Forms/AddPostForm";
import Popup from "../../components/PopUp";
import PostPage from "../../components/PostPage";
import PostPopUp from "../../components/PostPopUp";
import PageContainer from "../../layouts/PageContainer";
import { followThunk } from "../../redux/auth/asyncActions";
import { authUserSelector } from "../../redux/auth/selectors";
import { setCurrentUserPageThunk } from "../../redux/users/asyncActions";
import { usersSelector } from "../../redux/users/selectors";

import "./style.css";

const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const { currentUserPage: user, isLoading } = useSelector(usersSelector);
  const dispatch = useDispatch();
  const authUser = useSelector(authUserSelector);
  const isFollow = authUser.following.find((user) => user.id === id);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUserPageThunk(id));
  }, []);

  function handleFollowClick() {
    dispatch(followThunk(id));
  }

  if (isLoading) {
    return (
      <PageContainer>
        <p>...loading</p>
      </PageContainer>
    );
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
              <button
                onClick={handleFollowClick}
                className="user-page__button unfollow"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollowClick}
                className="user-page__button follow"
              >
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
                  navigate("/settings");
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
        {user.posts.length ? (
          user.posts.map((post) => {
            return (
              <PostPopUp src={post.imgUrl} key={post._id}>
                <PostPage post={post} user={user} />
              </PostPopUp>
            );
          })
        ) : (
          <h2 className="no-posts-title">
            {"User doen't have posts \u{1F641}"}
          </h2>
        )}
      </div>
    </PageContainer>
  );
};

export default UserPage;
