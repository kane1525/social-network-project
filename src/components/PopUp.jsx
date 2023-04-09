import { useState, useEffect, useRef } from 'react';

function DarkBackground({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

function Popup({ children, buttonText, setIsPopupOpen, isPopupOpen }) {
  return (
    <div>
      <button
        className="profile-control-btn"
        onClick={() => setIsPopupOpen(true)}
      >
        {buttonText}
      </button>
      <DarkBackground
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        {isPopupOpen && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        )}
      </DarkBackground>
    </div>
  );
}

export default Popup;
