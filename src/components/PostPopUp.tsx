import React, { ReactNode, useState } from "react";
import { BiX } from "react-icons/bi";

interface DarkBackgroundProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

function DarkBackground({ isOpen, onClose, children }: DarkBackgroundProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="postPopupBackground" onClick={onClose}>
      {children}
    </div>
  );
}

interface PostPopUpProps {
  src: string;
  children: ReactNode;
}

function PostPopUp({ children, src }: PostPopUpProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div>
      <img
        src={src}
        alt="post"
        onClick={() => {
          document.body.style.overflow = "hidden";
          setIsPopupOpen(true);
        }}
        className="post"
      />
      <DarkBackground
        isOpen={isPopupOpen}
        onClose={() => {
          document.body.style.overflow = "visible";
          setIsPopupOpen(false);
        }}
      >
        {isPopupOpen && (
          <div
            className="post-popupp"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BiX
              onClick={() => {
                document.body.style.overflow = "visible";
                setIsPopupOpen(false);
              }}
              className="post-popup__close"
            />
            {children}
          </div>
        )}
      </DarkBackground>
    </div>
  );
}

export default PostPopUp;
