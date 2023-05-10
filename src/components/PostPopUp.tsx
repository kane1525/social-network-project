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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        padding: "50px 0 100px 0",
      }}
      onClick={onClose}
    >
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
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              zIndex: 999,
              maxWidth: "90vw",
            }}
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
