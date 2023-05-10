import React, { ReactNode } from "react";

import BGImage from "../../assets/bg.png";
import Logo from "../../assets/logo.png";

import "./style.css";

interface ContainerProps {
  children: ReactNode;
}

const StartPageWrapper = ({ children }: ContainerProps) => {
  return (
    <div className="start-page-wrapper">
      <img src={BGImage} alt="backGroundImage" />
      <div className="start-page-wrapper_container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
          <h1>HIPSTAGRAM</h1>
        </div>
        <div className="children-container">{children}</div>
      </div>
    </div>
  );
};

export default StartPageWrapper;
