import React, { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GetCommentsByPostIdResponse } from "types/apiTypes";

import { deleteComment } from "../api";

interface CommentSettingsPopupProps {
  commentId: string;
  setPostComments: React.Dispatch<
    React.SetStateAction<GetCommentsByPostIdResponse>
  >;
  postComments: GetCommentsByPostIdResponse;
}

const CommentSettingsPopup = ({
  commentId,
  setPostComments,
  postComments,
}: CommentSettingsPopupProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const eTarget = event.target;
      if (
        popupRef.current &&
        !(popupRef.current as Node).contains(eTarget as Node) &&
        eTarget instanceof Element &&
        !eTarget.classList.contains("post-info__settings-popup")
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleIconClick: React.MouseEventHandler<SVGElement> = (event) => {
    event.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDeleteCommentClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    await deleteComment(commentId);
    const updatedComments = postComments.filter(
      (comment) => comment.id !== commentId
    );
    setPostComments(updatedComments);
  };

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
