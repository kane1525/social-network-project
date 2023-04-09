import React from 'react';
import './style.css';

const StartPageWrapper = ({ children }) => {
  return (
    <div className="start-page-wrapper">
      <img src="assets/bg.png" alt="" />
      <div className="start-page-wrapper_container">
        <div className="logo-container">
          <img src="assets/logo.png" alt="logo" />
          <h1>HIPSTAGRAM</h1>
        </div>
        <div className="children-container">{children}</div>
      </div>
    </div>
  );
};

export default StartPageWrapper;
