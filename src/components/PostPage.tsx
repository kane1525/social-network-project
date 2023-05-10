import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store.ts";
import {
  GetCommentsByPostIdResponse,
  Post,
  UserWithFollowCount,
} from "types/apiTypes";

import { createComment, getCommentsByPostId, likePost } from "../api";
import { ReactComponent as WithoutAvatar } from "../assets/Group.svg";
import {
  authUserPostsSelector,
  authUserSelector,
} from "../redux/auth/selectors";
import { togglePostLike } from "../redux/users/usersSlice";
import CommentSettingsPopup from "./CommentSettingsPopup.tsx";

interface PostPageProps {
  post: Post;
  user: UserWithFollowCount;
}

const PostPage = ({ post, user }: PostPageProps) => {
  const dispatch = useAppDispatch();

  const authUser = useSelector(authUserSelector);
  const authUserPosts = useSelector(authUserPostsSelector);

  const [postComments, setPostComments] = useState<GetCommentsByPostIdResponse>(
    []
  );
  const [isLoading, setisLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getCommentsByPostId(post._id).then((res) => {
      setPostComments(res);
      setisLoading(false);
    });
  }, [post._id]);

  const liked = !!post.likes.find((user) => user._id === authUser?.id);
  const [heartClass, setHeartClass] = useState(liked ? "liked" : "");

  let renderComments: JSX.Element;

  if (isLoading) {
    renderComments = <p>Loading...</p>;
  } else if (!postComments.length) {
    renderComments = <p>No comments</p>;
  } else {
    renderComments = (
      <ul className="post-info__comments-ul">
        {postComments.map((comment) => {
          const authUserPost = !!authUserPosts?.find(
            (post) => post._id === comment.postId
          );
          const authUserComment = comment.owner.id === authUser?.id;
          const showAdditionalSettings = authUserPost || authUserComment;
          return (
            <li className="post-info__comment" key={comment.id}>
              {comment.owner.avatar ? (
                <img src={comment.owner.avatar} alt="avatar" />
              ) : (
                <WithoutAvatar />
              )}
              <p className="post-info__comment-text">
                <span className="bold">{comment.owner.login}: </span>
                {comment.text}
              </p>
              {showAdditionalSettings && (
                <CommentSettingsPopup
                  commentId={comment.id}
                  setPostComments={setPostComments}
                  postComments={postComments}
                />
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  const handleLikeClick: React.MouseEventHandler<SVGElement> = () => {
    likePost(post._id).then((res) => {
      dispatch(togglePostLike({ user: authUser, postId: post._id }));
      if (res.status === "liked") {
        setHeartClass("liked");
      } else {
        setHeartClass("");
      }
    });
  };

  const handleSendCommentClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (!comment) return;
    try {
      const dataToSend = { text: comment, postId: post._id };
      const newComment = await createComment(dataToSend);
      setPostComments([...postComments, newComment]);
      setComment("");
    } catch (error) {}
  };

  return (
    <div className="post-popup">
      <img key={post._id} className="post" src={post.imgUrl} alt="post" />
      <div className="post-info">
        <div className="post-info__header">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <WithoutAvatar />
          )}
          <p>{user.login}</p>
        </div>
        <div className="post-info__line"></div>
        <div className="post-info__comments">{renderComments}</div>
        <div className="post-info__line"></div>
        <div className="post-info__controls">
          <FcLike
            className={`post-info__icon post-info__icon_heart ${heartClass}`}
            onClick={handleLikeClick}
          />
          <FaLocationArrow className="post-info__icon post-info__icon_arrow" />
          <p className="bold post-info__likes">likes: {post.likes.length}</p>
        </div>
        <div className="post-info__line"></div>
        <div className="post-info__add-comment">
          <div className="input-group">
            <input
              value={comment}
              type="text"
              className="form-control"
              placeholder="Write your comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={handleSendCommentClick}
              className="btn btn-primary"
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
