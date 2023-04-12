import React, { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { deleteComment } from "../api/api";

const CommentSettingsPopup = ({ commentId, setPostComments, postComments }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.classList.contains("post-info__settings-popup")
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleIconClick = (event) => {
    event.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  async function handleDeleteCommentClick() {
    await deleteComment(commentId);
    const updatedComments = postComments.filter(
      (comment) => comment.id !== commentId
    );
    setPostComments(updatedComments);
  }

  return (
    <div className="post-info__settings" ref={popupRef}>
      <BiDotsVerticalRounded
        className="post-info__comment-icon"
        onClick={handleIconClick}
      />
      {isPopupOpen && (
        <div className="post-info__settings-popup">
          <button
            onClick={handleDeleteCommentClick}
            className="post-info__delete-post-btn"
          >
            delete comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSettingsPopup;
